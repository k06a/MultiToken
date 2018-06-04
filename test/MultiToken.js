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

contract('MultiToken', function ([_, wallet1, wallet2, wallet3, wallet4, wallet5]) {

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

    describe('exchange 1:1', async function () {
        beforeEach(async function() {
            multi = await MultiToken.new([abc.address, xyz.address], [1, 1], "Multi", "1ABC_1XYZ", 18);
            await abc.approve(multi.address, 1000e6);
            await xyz.approve(multi.address, 500e6);
            await multi.mintFirstTokens(_, 1000, [1000e6, 500e6]);
        });

        it('should have valid prices for exchange tokens', async function() {
            (await multi.getReturn.call(abc.address, xyz.address, 10e6)).should.be.bignumber.equal(4950495);
            (await multi.getReturn.call(abc.address, xyz.address, 20e6)).should.be.bignumber.equal(9803921);
            (await multi.getReturn.call(abc.address, xyz.address, 30e6)).should.be.bignumber.equal(14563106);
            (await multi.getReturn.call(abc.address, xyz.address, 40e6)).should.be.bignumber.equal(19230769);
            (await multi.getReturn.call(abc.address, xyz.address, 50e6)).should.be.bignumber.equal(23809523);
            (await multi.getReturn.call(abc.address, xyz.address, 60e6)).should.be.bignumber.equal(28301886);
            (await multi.getReturn.call(abc.address, xyz.address, 70e6)).should.be.bignumber.equal(32710280);
            (await multi.getReturn.call(abc.address, xyz.address, 80e6)).should.be.bignumber.equal(37037037);
            (await multi.getReturn.call(abc.address, xyz.address, 90e6)).should.be.bignumber.equal(41284403);
            (await multi.getReturn.call(abc.address, xyz.address, 100e6)).should.be.bignumber.equal(45454545);

            (await multi.getReturn.call(xyz.address, abc.address, 10e6)).should.be.bignumber.equal(19607843);
            (await multi.getReturn.call(xyz.address, abc.address, 20e6)).should.be.bignumber.equal(38461538);
            (await multi.getReturn.call(xyz.address, abc.address, 30e6)).should.be.bignumber.equal(56603773);
            (await multi.getReturn.call(xyz.address, abc.address, 40e6)).should.be.bignumber.equal(74074074);
            (await multi.getReturn.call(xyz.address, abc.address, 50e6)).should.be.bignumber.equal(90909090);
            (await multi.getReturn.call(xyz.address, abc.address, 60e6)).should.be.bignumber.equal(107142857);
            (await multi.getReturn.call(xyz.address, abc.address, 70e6)).should.be.bignumber.equal(122807017);
            (await multi.getReturn.call(xyz.address, abc.address, 80e6)).should.be.bignumber.equal(137931034);
            (await multi.getReturn.call(xyz.address, abc.address, 90e6)).should.be.bignumber.equal(152542372);
            (await multi.getReturn.call(xyz.address, abc.address, 100e6)).should.be.bignumber.equal(166666666);
        });

        it('should be able to exchange tokens 0 => 1', async function() {
            (await xyz.balanceOf.call(wallet1)).should.be.bignumber.equal(0);
            await abc.approve(multi.address, 50e6, { from: wallet1 });
            await multi.change(abc.address, xyz.address, 50e6, 23809523, { from: wallet1 });
            (await xyz.balanceOf.call(wallet1)).should.be.bignumber.equal(23809523);
        });

        it('should not be able to exchange due to high min return argument', async function() {
            (await xyz.balanceOf.call(wallet1)).should.be.bignumber.equal(0);
            await abc.approve(multi.address, 50e6, { from: wallet1 });
            await multi.change(abc.address, xyz.address, 50e6, 23809523+1, { from: wallet1 }).should.be.rejectedWith(EVMRevert);
        });

        it('should be able to exchange tokens 1 => 0', async function() {
            (await abc.balanceOf.call(wallet2)).should.be.bignumber.equal(0);
            await xyz.approve(multi.address, 50e6, { from: wallet2 });
            await multi.change(xyz.address, abc.address, 50e6, 90909090, { from: wallet2 });
            (await abc.balanceOf.call(wallet2)).should.be.bignumber.equal(90909090);
        });

        it('should be able to buy tokens and sell back', async function() {
            (await xyz.balanceOf.call(wallet1)).should.be.bignumber.equal(0);
            await abc.approve(multi.address, 50e6, { from: wallet1 });
            await multi.change(abc.address, xyz.address, 50e6, 23809523, { from: wallet1 });

            (await abc.balanceOf.call(wallet1)).should.be.bignumber.equal(0);
            (await xyz.balanceOf.call(wallet1)).should.be.bignumber.equal(23809523);

            await xyz.approve(multi.address, 23809523, { from: wallet1 });
            await multi.change(xyz.address, abc.address, 23809523, 49999998, { from: wallet1 });

            (await abc.balanceOf.call(wallet1)).should.be.bignumber.equal(49999998);
        });
    });

    describe('exchange 2:1', async function () {
        beforeEach(async function() {
            multi = await MultiToken.new([abc.address, xyz.address], [2, 1], "Multi", "2ABC_1XYZ", 18);
            await abc.approve(multi.address, 1000e6);
            await xyz.approve(multi.address, 500e6);
            await multi.mintFirstTokens(_, 1000, [1000e6, 500e6]);
        });

        it('should have valid prices for exchange tokens', async function() {
            (await multi.getReturn.call(abc.address, xyz.address, 10e6)).should.be.bignumber.equal(4950494/2);
            (await multi.getReturn.call(abc.address, xyz.address, 20e6)).should.be.bignumber.equal(9803920/2);
            (await multi.getReturn.call(abc.address, xyz.address, 30e6)).should.be.bignumber.equal(14563106/2);
            (await multi.getReturn.call(abc.address, xyz.address, 40e6)).should.be.bignumber.equal(19230768/2);
            (await multi.getReturn.call(abc.address, xyz.address, 50e6)).should.be.bignumber.equal(23809522/2);
            (await multi.getReturn.call(abc.address, xyz.address, 60e6)).should.be.bignumber.equal(28301886/2);
            (await multi.getReturn.call(abc.address, xyz.address, 70e6)).should.be.bignumber.equal(32710280/2);
            (await multi.getReturn.call(abc.address, xyz.address, 80e6)).should.be.bignumber.equal(37037036/2);
            (await multi.getReturn.call(abc.address, xyz.address, 90e6)).should.be.bignumber.equal(41284402/2);
            (await multi.getReturn.call(abc.address, xyz.address, 100e6)).should.be.bignumber.equal(45454544/2);

            (await multi.getReturn.call(xyz.address, abc.address, 10e6)).should.be.bignumber.equal(19607843*2);
            (await multi.getReturn.call(xyz.address, abc.address, 20e6)).should.be.bignumber.equal(38461538*2);
            (await multi.getReturn.call(xyz.address, abc.address, 30e6)).should.be.bignumber.equal(56603773*2 + 1);
            (await multi.getReturn.call(xyz.address, abc.address, 40e6)).should.be.bignumber.equal(74074074*2);
            (await multi.getReturn.call(xyz.address, abc.address, 50e6)).should.be.bignumber.equal(90909090*2 + 1);
            (await multi.getReturn.call(xyz.address, abc.address, 60e6)).should.be.bignumber.equal(107142857*2);
            (await multi.getReturn.call(xyz.address, abc.address, 70e6)).should.be.bignumber.equal(122807017*2 + 1);
            (await multi.getReturn.call(xyz.address, abc.address, 80e6)).should.be.bignumber.equal(137931034*2);
            (await multi.getReturn.call(xyz.address, abc.address, 90e6)).should.be.bignumber.equal(152542372*2 + 1);
            (await multi.getReturn.call(xyz.address, abc.address, 100e6)).should.be.bignumber.equal(166666666*2 + 1);
        });
    });

});
