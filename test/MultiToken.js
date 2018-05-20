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
import {advanceBlock} from './helpers/advanceToBlock';
import {increaseTimeTo, duration} from './helpers/increaseTime';
import latestTime from './helpers/latestTime';
import EVMRevert from './helpers/EVMRevert';

const Token = artifacts.require('Token.sol');
const MultiToken = artifacts.require('MultiToken.sol');

contract('MultiToken', function ([_, wallet1, wallet2, wallet3, wallet4, wallet5]) {

    let abc;
    let xyz;
    let multi;

    beforeEach(async function() {
        abc = await Token.new("ABC");
        await abc.mint(_, 1000 * 10**6);
        await abc.mint(wallet1, 50 * 10**6);
        xyz = await Token.new("XYZ");
        await xyz.mint(_, 500 * 10**6);
        await xyz.mint(wallet2, 50 * 10**6);
    });

    describe('mint', async function () {
        beforeEach(async function() {
            multi = await MultiToken.new([abc.address, xyz.address], [1, 1], "Multi", "1ABC_1XYZ", 18);
        });

        it('should not mint first tokens with mint method', async function() {
            await multi.mint(_, 1).should.be.rejectedWith(EVMRevert);
        });

        it('should mint first tokens with mintFirstTokens method', async function() {
            await abc.approve(multi.address, 1000 * 10**6);
            await xyz.approve(multi.address, 500 * 10**6);
            await multi.mintFirstTokens(_, 1000, [1000 * 10**6, 500 * 10**6]);
        });

        it('should not mint second tokens with mintFirstTokens method', async function() {
            await abc.approve(multi.address, 1002 * 10**6);
            await xyz.approve(multi.address, 501 * 10**6);
            await multi.mintFirstTokens(_, 1000, [1000 * 10**6, 500 * 10**6]);
            await multi.mintFirstTokens(_, 1, [2 * 10**6, 1 * 10**6]).should.be.rejectedWith(EVMRevert);
        });
    });

    describe('exchange 1:1', async function () {
        beforeEach(async function() {
            multi = await MultiToken.new([abc.address, xyz.address], [1, 1], "Multi", "1ABC_1XYZ", 18);
            await abc.approve(multi.address, 1000 * 10**6);
            await xyz.approve(multi.address, 500 * 10**6);
            await multi.mintFirstTokens(_, 1000, [1000 * 10**6, 500 * 10**6]);
        });

        it('should have valid prices for exchange tokens', async function() {
            (await multi.exchangeRate.call(0, 1, 10 * 10**6)).should.be.bignumber.equal(4950495);
            (await multi.exchangeRate.call(0, 1, 20 * 10**6)).should.be.bignumber.equal(9803921);
            (await multi.exchangeRate.call(0, 1, 30 * 10**6)).should.be.bignumber.equal(14563106);
            (await multi.exchangeRate.call(0, 1, 40 * 10**6)).should.be.bignumber.equal(19230769);
            (await multi.exchangeRate.call(0, 1, 50 * 10**6)).should.be.bignumber.equal(23809523);
            (await multi.exchangeRate.call(0, 1, 60 * 10**6)).should.be.bignumber.equal(28301886);
            (await multi.exchangeRate.call(0, 1, 70 * 10**6)).should.be.bignumber.equal(32710280);
            (await multi.exchangeRate.call(0, 1, 80 * 10**6)).should.be.bignumber.equal(37037037);
            (await multi.exchangeRate.call(0, 1, 90 * 10**6)).should.be.bignumber.equal(41284403);
            (await multi.exchangeRate.call(0, 1, 100 * 10**6)).should.be.bignumber.equal(45454545);

            (await multi.exchangeRate.call(1, 0, 10 * 10**6)).should.be.bignumber.equal(19607843);
            (await multi.exchangeRate.call(1, 0, 20 * 10**6)).should.be.bignumber.equal(38461538);
            (await multi.exchangeRate.call(1, 0, 30 * 10**6)).should.be.bignumber.equal(56603773);
            (await multi.exchangeRate.call(1, 0, 40 * 10**6)).should.be.bignumber.equal(74074074);
            (await multi.exchangeRate.call(1, 0, 50 * 10**6)).should.be.bignumber.equal(90909090);
            (await multi.exchangeRate.call(1, 0, 60 * 10**6)).should.be.bignumber.equal(107142857);
            (await multi.exchangeRate.call(1, 0, 70 * 10**6)).should.be.bignumber.equal(122807017);
            (await multi.exchangeRate.call(1, 0, 80 * 10**6)).should.be.bignumber.equal(137931034);
            (await multi.exchangeRate.call(1, 0, 90 * 10**6)).should.be.bignumber.equal(152542372);
            (await multi.exchangeRate.call(1, 0, 100 * 10**6)).should.be.bignumber.equal(166666666);
        });

        it('should be able to exchange tokens 0 => 1', async function() {
            (await xyz.balanceOf.call(wallet1)).should.be.bignumber.equal(0);
            await abc.approve(multi.address, 50 * 10**6, { from: wallet1 });
            await multi.exchange(0, 1, 50 * 10**6, { from: wallet1 });
            (await xyz.balanceOf.call(wallet1)).should.be.bignumber.equal(23809523);
        });

        it('should be able to exchange tokens 1 => 0', async function() {
            (await abc.balanceOf.call(wallet2)).should.be.bignumber.equal(0);
            await xyz.approve(multi.address, 50 * 10**6, { from: wallet2 });
            await multi.exchange(1, 0, 50 * 10**6, { from: wallet2 });
            (await abc.balanceOf.call(wallet2)).should.be.bignumber.equal(90909090);
        });

        it('should be able to buy tokens and sell back', async function() {
            (await xyz.balanceOf.call(wallet1)).should.be.bignumber.equal(0);
            await abc.approve(multi.address, 50 * 10**6, { from: wallet1 });
            await multi.exchange(0, 1, 50 * 10**6, { from: wallet1 });

            (await abc.balanceOf.call(wallet1)).should.be.bignumber.equal(0);
            (await xyz.balanceOf.call(wallet1)).should.be.bignumber.equal(23809523);

            await xyz.approve(multi.address, 23809523, { from: wallet1 });
            await multi.exchange(1, 0, 23809523, { from: wallet1 });

            (await abc.balanceOf.call(wallet1)).should.be.bignumber.equal(49999998);
        });
    });

    describe('exchange 2:1', async function () {
        beforeEach(async function() {
            multi = await MultiToken.new([abc.address, xyz.address], [2, 1], "Multi", "2ABC_1XYZ", 18);
            await abc.approve(multi.address, 1000 * 10**6);
            await xyz.approve(multi.address, 500 * 10**6);
            await multi.mintFirstTokens(_, 1000, [1000 * 10**6, 500 * 10**6]);
        });

        it('should have valid prices for exchange tokens', async function() {
            (await multi.exchangeRate.call(0, 1, 10 * 10**6)).should.be.bignumber.equal(4950494/2);
            (await multi.exchangeRate.call(0, 1, 20 * 10**6)).should.be.bignumber.equal(9803920/2);
            (await multi.exchangeRate.call(0, 1, 30 * 10**6)).should.be.bignumber.equal(14563106/2);
            (await multi.exchangeRate.call(0, 1, 40 * 10**6)).should.be.bignumber.equal(19230768/2);
            (await multi.exchangeRate.call(0, 1, 50 * 10**6)).should.be.bignumber.equal(23809522/2);
            (await multi.exchangeRate.call(0, 1, 60 * 10**6)).should.be.bignumber.equal(28301886/2);
            (await multi.exchangeRate.call(0, 1, 70 * 10**6)).should.be.bignumber.equal(32710280/2);
            (await multi.exchangeRate.call(0, 1, 80 * 10**6)).should.be.bignumber.equal(37037036/2);
            (await multi.exchangeRate.call(0, 1, 90 * 10**6)).should.be.bignumber.equal(41284402/2);
            (await multi.exchangeRate.call(0, 1, 100 * 10**6)).should.be.bignumber.equal(45454544/2);

            (await multi.exchangeRate.call(1, 0, 10 * 10**6)).should.be.bignumber.equal(19607843*2);
            (await multi.exchangeRate.call(1, 0, 20 * 10**6)).should.be.bignumber.equal(38461538*2);
            (await multi.exchangeRate.call(1, 0, 30 * 10**6)).should.be.bignumber.equal(56603773*2 + 1);
            (await multi.exchangeRate.call(1, 0, 40 * 10**6)).should.be.bignumber.equal(74074074*2);
            (await multi.exchangeRate.call(1, 0, 50 * 10**6)).should.be.bignumber.equal(90909090*2 + 1);
            (await multi.exchangeRate.call(1, 0, 60 * 10**6)).should.be.bignumber.equal(107142857*2);
            (await multi.exchangeRate.call(1, 0, 70 * 10**6)).should.be.bignumber.equal(122807017*2 + 1);
            (await multi.exchangeRate.call(1, 0, 80 * 10**6)).should.be.bignumber.equal(137931034*2);
            (await multi.exchangeRate.call(1, 0, 90 * 10**6)).should.be.bignumber.equal(152542372*2 + 1);
            (await multi.exchangeRate.call(1, 0, 100 * 10**6)).should.be.bignumber.equal(166666666*2 + 1);
        });
    });

});
