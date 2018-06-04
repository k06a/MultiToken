// @flow
'use strict'

const abi = require('ethereumjs-abi');
const BigNumber = web3.BigNumber;
const expect = require('chai').expect;
const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(web3.BigNumber))
    .should();

import ether from './helpers/ether';
import { advanceBlock } from './helpers/advanceToBlock';
import { increaseTimeTo, duration } from './helpers/increaseTime';
import latestTime from './helpers/latestTime';
import EVMRevert from './helpers/EVMRevert';
import EVMThrow from './helpers/EVMThrow';

const Token = artifacts.require('Token.sol');
const MultiToken = artifacts.require('MultiToken.sol');

contract('BasicMultiToken', function ([_, wallet1, wallet2, wallet3, wallet4, wallet5]) {

    let abc;
    let xyz;
    let lmn;
    let multi;

    beforeEach(async function() {
        abc = await Token.new("ABC");
        await abc.mint(_, 1000e6);
        await abc.mint(wallet1, 50e6);

        xyz = await Token.new("XYZ");
        await xyz.mint(_, 500e6);
        await xyz.mint(wallet2, 50e6);

        lmn = await Token.new("LMN");
        await lmn.mint(_, 100e6);
    });

    describe('mint', async function () {
        beforeEach(async function() {
            multi = await MultiToken.new([abc.address, xyz.address], [1, 1], "Multi", "1ABC_1XYZ", 18);
        });

        it('should not mint first tokens with mint method', async function() {
            await multi.mint(_, 1).should.be.rejectedWith(EVMRevert);
        });

        it('should mint first tokens with mintFirstTokens method', async function() {
            await abc.approve(multi.address, 1000e6);
            await xyz.approve(multi.address, 500e6);
            await multi.mintFirstTokens(_, 1000, [1000e6, 500e6]);
        });

        it('should not mint second tokens with mintFirstTokens method', async function() {
            await abc.approve(multi.address, 1002e6);
            await xyz.approve(multi.address, 501e6);
            await multi.mintFirstTokens(_, 1000, [1000e6, 500e6]);
            await multi.mintFirstTokens(_, 1, [2e6, 1e6]).should.be.rejectedWith(EVMRevert);
        });
    });

    describe('burn', async function () {
        beforeEach(async function() {
            multi = await MultiToken.new([abc.address, xyz.address], [1, 1], "Multi", "1ABC_1XYZ", 18);
            await abc.approve(multi.address, 1000e6);
            await xyz.approve(multi.address, 500e6);
            await multi.mintFirstTokens(_, 1000, [1000e6, 500e6]);
        });

        it('should not burn when no tokens', async function() {
            await multi.burn(1, { from: wallet1 }).should.be.rejectedWith(EVMThrow);
        });

        it('should not burn too many tokens', async function() {
            await multi.burn(1001).should.be.rejectedWith(EVMThrow);
        });

        it('should burn owned tokens', async function() {
            await multi.burn(200);
            await multi.burn(801).should.be.rejectedWith(EVMThrow);
            await multi.burn(300);
            await multi.burn(501).should.be.rejectedWith(EVMThrow);
            await multi.burn(500);
            await multi.burn(1).should.be.rejectedWith(EVMThrow);

            (await abc.balanceOf.call(multi.address)).should.be.bignumber.equal(0);
            (await xyz.balanceOf.call(multi.address)).should.be.bignumber.equal(0);
        });

        it('should be able to burn in case of some tokens paused', async function() {
            await abc.pause();
            await multi.burn(500).should.be.rejectedWith(EVMRevert);

            const xyzBalance = await xyz.balanceOf.call(multi.address);
            await multi.burnSome(500, [xyz.address]);
            (await multi.balanceOf.call(_)).should.be.bignumber.equal(500);
            (await xyz.balanceOf.call(_)).should.be.bignumber.equal(xyzBalance / 2);
        });

        it('should be able to receive airdrop while burn', async function() {
            await lmn.transfer(multi.address, 100e6);

            const lmnBalance = await lmn.balanceOf.call(multi.address);
            await multi.burnSome(500, [abc.address, xyz.address, lmn.address]);
            (await multi.balanceOf.call(_)).should.be.bignumber.equal(500);
            (await lmn.balanceOf.call(_)).should.be.bignumber.equal(lmnBalance / 2);
        });
    });
});
