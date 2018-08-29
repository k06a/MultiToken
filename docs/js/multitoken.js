
// Number.prototype.toFixedSpecial = function(n) {
//     var str = this.toFixed(n);
//     if (str.indexOf('e+') < 0)
//         return str;

//     // if number is in scientific notation, pick (b)ase and (p)ower
//     return str.replace('.', '').split('e+').reduce(function(p, b) {
//         return p + Array(b - p.length + 2).join(0);
//     }) + ((n == 0 || n == undefined) ? '' : ('.' + Array(n + 1).join(0)));
// };

const bancorNetworkABI = [{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_register","type":"bool"}],"name":"registerEtherToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_signerAddress","type":"address"}],"name":"setSignerAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_for","type":"address"},{"name":"_block","type":"uint256"},{"name":"_nonce","type":"uint256"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"convertForPrioritized","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"signerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_for","type":"address"},{"name":"_block","type":"uint256"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"convertForPrioritized2","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_FORMULA","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"etherTokens","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CONTRACT_FEATURES","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"conversionHashes","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_NETWORK","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CONVERTER_CONVERSION_WHITELIST","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gasPriceLimit","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_for","type":"address"}],"name":"claimAndConvertFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_paths","type":"address[]"},{"name":"_pathStartIndex","type":"uint256[]"},{"name":"_amounts","type":"uint256[]"},{"name":"_minReturns","type":"uint256[]"},{"name":"_for","type":"address"}],"name":"convertForMultiple","outputs":[{"name":"","type":"uint256[]"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"claimAndConvert","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_for","type":"address"}],"name":"convertFor","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gasPriceLimit","type":"address"}],"name":"setGasPriceLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"convert","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_registry","type":"address"}],"name":"setContractRegistry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_registry","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];
const detailedERC20ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
const multiTokenNetworkABI = [{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"deployers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"multitokens","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"mtkn","type":"address"}],"name":"NewMultitoken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"index","type":"uint256"},{"indexed":true,"name":"oldDeployer","type":"address"},{"indexed":true,"name":"newDeployer","type":"address"}],"name":"NewDeployer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"multitokensCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allMultitokens","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"wallet","type":"address"}],"name":"allWalletBalances","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"},{"name":"deployer","type":"address"}],"name":"setDeployer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"},{"name":"data","type":"bytes"}],"name":"deploy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const multiTokenABI =  [{"constant":true,"inputs":[],"name":"changeFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ONE_HUNDRED_PERCRENTS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokens","type":"address[]"},{"name":"_weights","type":"uint256[]"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"name":"init2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_tokenAmounts","type":"uint256[]"}],"name":"bundleFirstTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allTokensDecimalsBalances","outputs":[{"name":"_tokens","type":"address[]"},{"name":"_decimals","type":"uint8[]"},{"name":"_balances","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"lendFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"tokens","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allBalances","outputs":[{"name":"_balances","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"allTokens","outputs":[{"name":"_tokens","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"weights","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"allTokensDecimalsBalancesWeights","outputs":[{"name":"_tokens","type":"address[]"},{"name":"_decimals","type":"uint8[]"},{"name":"_balances","type":"uint256[]"},{"name":"_weights","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"},{"name":"_value","type":"uint256"}],"name":"unbundle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"},{"name":"_value","type":"uint256"},{"name":"_tokens","type":"address[]"}],"name":"unbundleSome","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"allWeights","outputs":[{"name":"_weights","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"caller_","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"refferalFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"},{"name":"_amount","type":"uint256"}],"name":"bundle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"allDecimals","outputs":[{"name":"_decimals","type":"uint8[]"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"who","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Bundle","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"who","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Unbundle","type":"event"},{"anonymous":false,"inputs":[],"name":"Update","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_fromToken","type":"address"},{"indexed":true,"name":"_toToken","type":"address"},{"indexed":true,"name":"_changer","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_return","type":"uint256"}],"name":"Change","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_tokens","type":"address[]"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"name":"init","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokens","type":"address[]"},{"name":"_weights","type":"uint256[]"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"","type":"uint8"}],"name":"init","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_lendFee","type":"uint256"}],"name":"setLendFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_changeFee","type":"uint256"}],"name":"setChangeFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_refferalFee","type":"uint256"}],"name":"setRefferalFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"}],"name":"getReturn","outputs":[{"name":"returnAmount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"change","outputs":[{"name":"returnAmount","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_ref","type":"address"}],"name":"changeWithRef","outputs":[{"name":"returnAmount","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_token","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_target","type":"address"},{"name":"_data","type":"bytes"}],"name":"lend","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}];
const multiBuyerABI = [{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"reclaimToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_mtkn","type":"address"},{"name":"_minimumReturn","type":"uint256"},{"name":"_throughToken","type":"address"},{"name":"_exchanges","type":"address[]"},{"name":"_datas","type":"bytes"},{"name":"_datasIndexes","type":"uint256[]"},{"name":"_values","type":"uint256[]"}],"name":"buyOnApprove","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_mtkn","type":"address"},{"name":"_minimumReturn","type":"uint256"},{"name":"_throughToken","type":"address"},{"name":"_exchanges","type":"address[]"},{"name":"_datas","type":"bytes"},{"name":"_datasIndexes","type":"uint256[]"},{"name":"_values","type":"uint256[]"}],"name":"buyOnTransfer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_mtkn","type":"address"},{"name":"_throughToken","type":"address"},{"name":"_exchanges","type":"address[]"},{"name":"_datas","type":"bytes"},{"name":"_datasIndexes","type":"uint256[]"},{"name":"_values","type":"uint256[]"}],"name":"buyFirstTokensOnApprove","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_mtkn","type":"address"},{"name":"_throughToken","type":"address"},{"name":"_exchanges","type":"address[]"},{"name":"_datas","type":"bytes"},{"name":"_datasIndexes","type":"uint256[]"},{"name":"_values","type":"uint256[]"}],"name":"buyFirstTokensOnTransfer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}];
const multiSellerABI = [{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"reclaimToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_mtkn","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_throughToken","type":"address"},{"name":"_exchanges","type":"address[]"},{"name":"_datas","type":"bytes"},{"name":"_datasIndexes","type":"uint256[]"}],"name":"sellOnApproveForOrigin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_mtkn","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_throughToken","type":"address"},{"name":"_exchanges","type":"address[]"},{"name":"_datas","type":"bytes"},{"name":"_datasIndexes","type":"uint256[]"},{"name":"_for","type":"address"}],"name":"sellOnApprove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

const bancorTokens = {
    'ETH': '0xc0829421C1d260BD3cB3E0F06cfE2D52db2cE315',
    'BNT': '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C',
    'AION': '0x4CEdA7906a5Ed2179785Cd3A40A69ee8bc99C466',
    'POA20': '0x6758b7d441a9739b98552b373703d8d3d14f9e62',
    'GNO': '0x6810e776880c02933d47db1b9fc05908e5386b96',
    'WINGS': '0x667088b212ce3d06a1b553a7221E1fD19000d9aF',
    'STX': '0x006bea43baa3f7a6f765f14f10a1a1b08334ef45',
    'BAT': '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
    'STORM': '0xd0a4b8946cb52f0661273bfbc6fd0e0c75fc6433',
    'J8T': '0x0d262e5dc4a06a0f1c90ce79c7a60c09dfc884e4',
    'BBO': '0x84f7c44b6fed1080f647e354d552595be2cc602f',
    'POE': '0x0e0989b1f9b8a38983c2ba8053269ca62ec9b195',
    'VEE': '0x340d2bde5eb28c1eed91b2f790723e3b160613b7',
    'ATS': '0x2dAEE1AA61D60A252DC80564499A69802853583A',
    'SNT': '0x744d70fdbe2ba4cf95131626614a1763df805b9e',
    'MFT': '0xdf2c7238198ad8b389666574f2d8bc411a4b7428',
    'RVT': '0x3d1ba9be9f66b8ee101911bc36d3fb562eac2244',
    'SCL': '0xd7631787b4dcc87b1254cfd1e5ce48e96823dee8',
    'WAX': '0x39bb259f66e1c59d5abef88375979b4d20d98022',
    'ENJ': '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
    'EDG': '0x08711d3b02c8758f2fb3ab4e80228418a7f8e39c',
    'DBET': '0x9b68bfae21df5a510931a262cecf63f41338f264',
    'BETR': '0x763186eb8d4856d536ed4478302971214febc6a9',
    'ESZ': '0xe8a1df958be379045e2b46a31a98b93a2ecdfded'
};

const bancorRelays = {
    'ETH': '0xc0829421C1d260BD3cB3E0F06cfE2D52db2cE315',
    'BNT': '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C',
    'AION': '0x73fa2b855be96ab3c73f375b8ec777226efa3845',
    'POA20': '0x564c07255afe5050d82c8816f78da13f2b17ac6d',
    'GNO': '0xd7eB9DB184DA9f099B84e2F86b1da1Fe6b305B3d',
    'WINGS': '0xa6ab3c8ae51962f4582db841de6b0a092041461e',
    'STX': '0x006bea43baa3f7a6f765f14f10a1a1b08334ef45',
    'BAT': '0x131da075a2832549128e93acc2b54174045232cf',
    'STORM': '0xcad4da66e00fdecabec137a24e12af8edf303a1d',
    'J8T': '0x8e00bacd7d8265d8f3f9d5b4fbd7f6b0b0c46f36',
    'BBO': '0x980b4118dab781829df80d7912d70b059a280dad',
    'POE': '0xa5f2a49aafa052e28a50a575cd9e7488fa598e78',
    'VEE': '0xc9c3a465380bfaac486c89ff7d5f60cc275d4e08',
    'ATS': '0x1d75ebc72f4805e9c9918b36a8969b2e3847c9fb',
    'SNT': '0xa3b3c5a8b22c044d5f2d372f628245e2106d310d',
    'MFT': '0xe3cb9c37c2e9eaaf152f47ef064e583b1efb5967',
    'RVT': '0x5039f60594ffa3f1a5acbe85e1ebe12dc8da7c5c',
    'SCL': '0xfceb45cf070b277fede520c5539ae204bc1d493e',
    'WAX': '0x67563e7a0f13642068f6f999e48c690107a4571f',
    'ENJ': '0xf3ad2cbc4276eb4b0fb627af0059cfce094e20a1',
    'EDG': '0xf95dd0fc6df64b2f149afa9219579e0f850bcd4d',
    'DBET': '0xfe9e6111e45a6066374bf33e831e80b1949a9faa',
    'BETR': '0x679f601f0deb53c2db0c8c26369fdcba5fd753cf',
    'ESZ': '0xa2020e324c365d05e87cf25552e6e6734260b089'
};

var account;
var web3js;

async function connectToWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    let accountPromiseDone;
    let accountPromise = new Promise(done => accountPromiseDone = done);
    function updateAccount() {
        web3js.eth.getAccounts(async function(error, result) {
            if (result && result.length > 0) {
                if (account !== result[0]) {
                    account = result[0];
                    console.log(`Account: ${account} https://ethrscan.io/address/${account}`);
                }
            } else {
                console.log(`Account: NULL`);
            }

            setTimeout(updateAccount, 1000);
            if (accountPromiseDone) {
                accountPromiseDone();
            }
        });
    }

    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider);
        updateAccount();
    } else {
        console.log('No web3js? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        web3js = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
        web3 = web3js;
        updateAccount();
        accountPromiseDone();
    }
    await accountPromise;
    accountPromiseDone = null;
}

async function sendTransaction(preTx, value, to) {
    // Get gas price
    const gasPriceJSON = (await $.getJSON('https://gasprice.poa.network/'));
    console.log('gasPriceJSON = ', gasPriceJSON);
    const estimateGas = await preTx.estimateGas({ from: account, value: value, gasPrice: gasPriceJSON.standard * 10**9 });
    console.log('estimateGas = ', estimateGas);
    const gasPrice = Math.trunc((gasPriceJSON.standard + (gasPriceJSON.fast - gasPriceJSON.standard)*estimateGas/4000000) * 10**9);
    console.log('gasPrice = ', gasPrice / 10**9);

    if (account) {
        const tx = await preTx.send({ from: account, value: value, gasPrice: gasPrice });
        console.log(tx);
    } else {
        $('#tx_to').val(to);
        $('#tx_value').val(value);
        $('#tx_data').val(preTx.encodeABI());
        $('#tx_gas').val(estimateGas);
        $('#tx_gas_price').val(Math.trunc(gasPrice/10**9*100)/100 + ' Gwei');
        $('#txModal').modal('show');
    }
}

window.addEventListener('load', async function() {

    $('#multiTokenNetworkAddress').bind('input', async function() {
        const networkContract = new web3js.eth.Contract(multiTokenNetworkABI, $('#multiTokenNetworkAddress').val());

        const deployersPromises = [];
        for (let i = 0; i < 10; i++) {
            deployersPromises.push(networkContract.methods.deployers(i).call());
        }
        const allDeployers = (await Promise.all(deployersPromises)).filter(d => d != "0x0000000000000000000000000000000000000000");
        console.log('Deployers: ', allDeployers);
        $('#multiTokenDeployers').html(allDeployers.map(
            (d,i) => `<option${i?'':' selected'}>${d}</option>`
        ).join() + '<option>New</option>');

        const allMultitokens = await networkContract.methods.allMultitokens().call();
        console.log('Multitokens: ', allMultitokens);
        $('#multiTokens').html(allMultitokens.map(
            (mt,i) => `<option${i?'':' selected'}>${mt}</option>`).join()
        );
        $('#multiTokens').triggerHandler('change');
    });

    $('#multiTokens').bind('change', async function() {
        const multitokenContract = new web3js.eth.Contract(multiTokenABI, $('#multiTokens').val());

        const allTokens = await multitokenContract.methods.allTokens().call();
        const allTokensNames = await Promise.all(
            allTokens.map(token => {
                const tokenContract = new web3js.eth.Contract(detailedERC20ABI, token);
                return tokenContract.methods.symbol().call();
            })
        );
        const allTokensDecimals = await Promise.all(
            allTokens.map(token => {
                const tokenContract = new web3js.eth.Contract(detailedERC20ABI, token);
                return tokenContract.methods.decimals().call();
            })
        );
        const allTokensBalances = await Promise.all(
            allTokens.map(token => {
                const tokenContract = new web3js.eth.Contract(detailedERC20ABI, token);
                return tokenContract.methods.balanceOf(multitokenContract.options.address).call();
            })
        );

        const allTokensWeights = await multitokenContract.methods.allWeights().call();

        $("#tokens tbody").html(allTokens.map(
            (token, index) =>
                `<tr id="token_${index}">` +
                    `<td>${index}</td>` +
                    `<td>${allTokensNames[index]}</td>` +
                    `<td>${allTokensDecimals[index]}</td>` +
                    `<td>${allTokensBalances[index]/10**(allTokensDecimals[index])}</td>` +
                    `<td>${allTokensWeights[index]}</td>` +
                    `<td><a href="https://etherscan.io/token/${token}?a=${multitokenContract.options.address}">${token.substr(0,10)}...</a></td>` +
                `</tr>`
        ).join());

        if (account) {
            const accountBalance = web3js.utils.toBN(await multitokenContract.methods.balanceOf(account).call());
            $('#sell-for-eth-input').val(accountBalance.toString());
        }
    });

    $('#new-multitoken-create').bind('click', async function () {
        const multitokenContract = new web3js.eth.Contract(multiTokenABI, $('#multiTokens').val());
        const networkContract = new web3js.eth.Contract(multiTokenNetworkABI, $('#multiTokenNetworkAddress').val());
        
        const multitokenName = $('#new-multitoken-name').val();
        const multitokenSymbol = $('#new-multitoken-symbol').val();
        const multitokenTokens = $('#new-multitoken-tokens').val().split('\n');
        const multitokenWeights = $('#new-multitoken-weights').val().split('\n');

        if (multitokenName.length == 0 || !/^[0-9a-zA-Z +-_]+$/.test(multitokenName)) {
            alert(`New MultiToken name "${multitokenName}" is invalid`);
            return;
        }

        if (multitokenSymbol.length == 0 || !/^[0-9a-zA-Z-_]+$/.test(multitokenSymbol)) {
            alert(`New MultiToken symbol "${multitokenSymbol}" is invalid`);
            return;
        }

        for (let i in multitokenTokens) {
            if (multitokenTokens[i].length == 0 || !/^0x[0-9a-zA-Z]{40}$/.test(multitokenTokens[i])) {
                alert(`New MultiToken token #${i+1} with name "${multitokenTokens[i]}" is invalid`);
                return;
            }
            if (multitokenTokens[i] != web3js.utils.toChecksumAddress(multitokenTokens[i])) {
                alert(`New MultiToken token #${multitokenTokens[i]} address checksum is wrong`);
                return;
            }
        }

        if (multitokenTokens.length != multitokenWeights.length) {
            alert(`New MultiToken subtokens (${multitokenTokens.length}) and weights (${multitokenWeights.length}) amounts should match`);
            return;
        }

        for (let i in multitokenWeights) {
            if (multitokenWeights[i].length == 0 || Number.parseInt(multitokenWeights) <= 0) {
                alert(`New MultiToken weight #${i+1} with value "${multitokenWeights[i]}" is invalid`);
                return;
            }
        }

        const index = $('#multiTokenDeployers').prop('selectedIndex');
        console.log('Deployer index = ' + index)
        console.log('multitokenTokens = ' + multitokenTokens);
        console.log('multitokenWeights = ' + multitokenWeights);
        console.log('multitokenName = ' + multitokenName);
        console.log('multitokenSymbol = ' + multitokenSymbol);
        const data = multitokenContract.methods.init(multitokenTokens, multitokenWeights, multitokenName, multitokenSymbol, 18).encodeABI();
        const preTx = networkContract.methods.deploy(index, data);

        sendTransaction(preTx, 0, networkContract.options.address);
    });

    $('#buy-for-eth').bind('click', async function () {
        const bancorNetworkContract = new web3js.eth.Contract(bancorNetworkABI, $('#bancorNetworkAddress').val());
        const multiBuyerContract = new web3js.eth.Contract(multiBuyerABI, $('#multiBuyerAddress').val());
        const multitokenContract = new web3js.eth.Contract(multiTokenABI, $('#multiTokens').val());
        const multitokenTotalSupply = await multitokenContract.methods.totalSupply().call();

        // Get token names and amounts
        const allTokens = await multitokenContract.methods.allTokens().call();
        const allTokensNames = await Promise.all(
            allTokens.map(token => {
                const tokenContract = new web3js.eth.Contract(detailedERC20ABI, token);
                return tokenContract.methods.symbol().call();
            })
        );
        console.log('allTokensNames = ' + allTokensNames);

        const allTokensPowers = (await Promise.all(
            allTokens.map(token => {
                const tokenContract = new web3js.eth.Contract(detailedERC20ABI, token);
                return tokenContract.methods.decimals().call();
            })
        )).map((b,i) => web3js.utils.toBN(10 ** b));
        console.log('allTokensPowers = ' + allTokensPowers.map(a => a.toString()));

        const allTokensBalances = (await Promise.all(
            allTokens.map(token => {
                const tokenContract = new web3js.eth.Contract(detailedERC20ABI, token);
                return tokenContract.methods.balanceOf(multitokenContract.options.address).call();
            })
        )).map((b,i) => web3js.utils.toBN(b));
        console.log('allTokensBalances = ' + allTokensBalances.map(a => a.toString()));

        const allTokensWeights = (await multitokenContract.methods.allWeights().call()).map(w => Number.parseInt(w));
        const allTokensWeightsSum = allTokensWeights.reduce((a, b) => a + b);
        console.log('allTokensWeights = ', allTokensWeights);
        console.log('allTokensWeightsSum = ' + allTokensWeightsSum);

        // Get token prices to determine amounts
        let skip = 0;
        const tokenPriceETH = {};
        while (Object.keys(tokenPriceETH).length % 100 == 0) {
            const json = await $.getJSON(`https://api.bancor.network/0.1/currencies/tokens?limit=100&skip=${skip}&fromCurrencyCode=ETH&includeTotal=false&orderBy=liquidityDepth&sortOrder=desc`);
            if (!json.data.currencies.page.length) {
                break;
            }
            for (let object of json.data.currencies.page) {
                tokenPriceETH[object.code] = web3js.utils.toBN(Math.trunc(object.price * 10**10));
            }
            skip += 100;
        }

        const multitokenCapitalizationWei = allTokensBalances
            .map((b,i) => b.mul(tokenPriceETH[allTokensNames[i]]).mul(_18).div(_10).div(allTokensPowers[i]))
            .reduce((a, b) => a.add(b));
        console.log('multitokenCapitalizationWei = ' + multitokenCapitalizationWei.toString());

        const value = web3js.utils.toBN(web3js.utils.toWei($('#buy-for-eth-input').val()));
        console.log('value = ' + value.toString());
        const bntAmount = value.mul(_10).div(tokenPriceETH.BNT).muln(99).divn(100); // -1%
        console.log('bntValue = ' + bntAmount.toString());

        const targets = [];
        let datas = "";
        const datasIndexes = [0];
        const values = [];

        {
            const amount = value;
            const minReturn = bntAmount;
            const path = [bancorTokens.ETH, bancorRelays.BNT, bancorTokens.BNT];
            console.log('сonvert', path, amount.toString(), minReturn.toString());
            const data = bancorNetworkContract.methods.convert(path, amount, minReturn).encodeABI().substr(2);

            targets.push(bancorNetworkContract.options.address);
            datas += data;
            datasIndexes.push(datas.length/2);
            values.push(amount);
        }

        for (let i = 0; i < allTokens.length; i++) {
            const tokenName = allTokensNames[i];
            if (tokenName == 'BNT') {
                continue;
            }
            let amount = 0;
            if (!multitokenCapitalizationWei.isZero()) {
                const tokenCapitalizationWei = allTokensBalances[i].mul(tokenPriceETH[tokenName]).mul(_18).div(_10).div(allTokensPowers[i]);
                amount = bntAmount.mul(tokenCapitalizationWei).div(multitokenCapitalizationWei);
            } else {
                amount = bntAmount.muln(allTokensWeights[i]).divn(allTokensWeightsSum);
            }
            const minReturn = amount.mul(tokenPriceETH.BNT).mul(allTokensPowers[i]).div(_18).div(tokenPriceETH[tokenName]).muln(99).divn(100); // -1%
            const path = [
                bancorTokens.BNT,
                bancorRelays[tokenName],
                bancorTokens[tokenName]
            ];
            console.log('claimAndConvert', path, amount.toString(), minReturn.toString());
            const data = bancorNetworkContract.methods.claimAndConvert(path, amount, minReturn).encodeABI().substr(2);

            targets.push(bancorNetworkContract.options.address);
            datas += data;
            datasIndexes.push(datas.length/2);
            values.push(0);
        }

        let preTx;
        if (multitokenTotalSupply == 0) {
            preTx = multiBuyerContract.methods.buyFirstTokensOnApprove(
                multitokenContract.options.address,
                bancorTokens.BNT,
                targets,
                '0x' + datas,
                datasIndexes,
                values
            );
        } else {
            preTx = await multiBuyerContract.methods.buyOnApprove(
                multitokenContract.options.address,
                0,
                bancorTokens.BNT,
                targets,
                '0x' + datas,
                datasIndexes,
                values
            );
        }


        sendTransaction(preTx, value, multiBuyerContract.options.address);

        // function convert(IERC20Token[] _path, uint256 _amount, uint256 _minReturn) public payable returns (uint256)
        // function claimAndConvert(IERC20Token[] _path, uint256 _amount, uint256 _minReturn) public payable returns (uint256)
        // function convertForMultiple(IERC20Token[] _paths, uint256[] _pathStartIndex, uint256[] _amounts, uint256[] _minReturns, address _for) public payable returns (uint256[])
        // function buy(
        //     IMultiToken _mtkn,
        //     uint256 _minimumReturn,
        //     ERC20 _throughToken,
        //     address[] _exchanges,
        //     bytes _datas,
        //     uint[] _datasIndexes, // including 0 and LENGTH values
        //     uint256[] _values
    });

    $('#sell-for-eth').bind('click', async function () {
        const bancorNetworkContract = new web3js.eth.Contract(bancorNetworkABI, $('#bancorNetworkAddress').val());
        const multiSellerContract = new web3js.eth.Contract(multiSellerABI, $('#multiSellerAddress').val());
        const multitokenContract = new web3js.eth.Contract(multiTokenABI, $('#multiTokens').val());
        const multitokenAmount = web3js.utils.toBN($('#sell-for-eth-input').val());
        const multitokenTotalSupply = web3js.utils.toBN(await multitokenContract.methods.totalSupply().call());

        const allTokens = await multitokenContract.methods.allTokens().call();
        const allTokensNames = await Promise.all(
            allTokens.map(token => {
                const tokenContract = new web3js.eth.Contract(detailedERC20ABI, token);
                return tokenContract.methods.symbol().call();
            })
        );
        console.log('allTokensNames = ' + allTokensNames);

        const allTokensPowers = (await Promise.all(
            allTokens.map(token => {
                const tokenContract = new web3js.eth.Contract(detailedERC20ABI, token);
                return tokenContract.methods.decimals().call();
            })
        )).map((b,i) => web3js.utils.toBN(10 ** b));
        console.log('allTokensPowers = ' + allTokensPowers.map(a => a.toString()));

        const allTokensBalances = (await Promise.all(
            allTokens.map(token => {
                const tokenContract = new web3js.eth.Contract(detailedERC20ABI, token);
                return tokenContract.methods.balanceOf(multitokenContract.options.address).call();
            })
        )).map((b,i) => web3js.utils.toBN(b));
        console.log('allTokensBalances = ' + allTokensBalances.map(a => a.toString()));

        // Get token prices to determine amounts
        const json = await $.getJSON('https://api.bancor.network/0.1/currencies/tokens?limit=100&skip=0&fromCurrencyCode=ETH&includeTotal=false&orderBy=liquidityDepth&sortOrder=desc');
        const tokenPriceETH = {};
        for (let object of json.data.currencies.page) {
            tokenPriceETH[object.code] = web3js.utils.toBN(Math.trunc(object.price * 10**10));
        }

        const targets = [];
        let datas = '';
        const datasIndexes = [0];
        let bntAmount = web3js.utils.toBN(0);
        for (let i = 0; i < allTokens.length; i++) {
            const tokenName = allTokensNames[i];
            const amount = allTokensBalances[i].mul(multitokenAmount).div(multitokenTotalSupply);
            bntAmount = bntAmount.add(amount.mul(tokenPriceETH[tokenName]).div(tokenPriceETH.BNT));
            const path = [
                bancorTokens[tokenName],
                bancorRelays[tokenName],
                bancorTokens.BNT,
            ];
            const minReturn = 1;
            console.log('claimAndConvert', path, amount.toString(), minReturn);
            const data = bancorNetworkContract.methods.claimAndConvert(path, amount, minReturn).encodeABI().substr(2);

            targets.push(bancorNetworkContract.options.address);
            datas += data;
            datasIndexes.push(datas.length/2);
            //values.push(amount);
        }

        {
            const amount = bntAmount.muln(99).divn(100); // -1%
            const path = [
                bancorTokens.BNT,
                bancorRelays.BNT,
                bancorTokens.ETH
            ];
            const minReturn = amount.mul(tokenPriceETH.BNT).div(_10).muln(98).divn(100); // -2%
            console.log('claimAndConvert', path, amount.toString(), minReturn.toString());
            const data = bancorNetworkContract.methods.claimAndConvertFor(path, amount, minReturn, multiSellerContract.options.address).encodeABI().substr(2);

            targets.push(bancorNetworkContract.options.address);
            datas += data;
            datasIndexes.push(datas.length/2);
        }

        const sellData = multiSellerContract.methods.sellOnApproveForOrigin(
            multitokenContract.options.address,
            multitokenAmount,
            bancorTokens.BNT,
            targets,
            '0x' + datas,
            datasIndexes
        ).encodeABI();

        const preTx = multitokenContract.methods.approveAndCall(
            multiSellerContract.options.address,
            multitokenAmount,
            sellData
        );

        sendTransaction(preTx, 0, multiSellerContract.options.address);
    });

    // SETUP UI

    for (const name of ['#tx_to', '#tx_value', '#tx_data', '#tx_gas', '#multiTokens', '#multiTokenDeployers']) {
        let buttonName = name + '_copy';
        $(buttonName).tooltip();

        $(buttonName).bind('click', function() {
            var copy = function (e) {
                e.preventDefault();
                if (e.clipboardData) {
                    e.clipboardData.setData('text/plain', $(name).val());
                } else if (window.clipboardData) {
                    window.clipboardData.setData('Text', $(name).val());
                }
            }

            window.addEventListener('copy', copy);
            try {
                if (document.execCommand('copy')) {
                    $(buttonName).trigger('copied', ['Copied!']);
                } else {
                    $(buttonName).trigger('copied', ['Copy with Ctrl/Cmd+C']);
                }
            } catch (err) {
                $(buttonName).trigger('copied', ['Copy with Ctrl/Cmd+C']);
            }
            window.removeEventListener('copy', copy);
        });

        $(buttonName).bind('copied', function(event, message) {
            $(this).attr('title', message)
                .tooltip('_fixTitle') // https://github.com/mistic100/jQuery-QueryBuilder/issues/432#issuecomment-395164492
                .tooltip('show')
                .attr('title', 'Copy to Clipboard')
                .tooltip('_fixTitle');
            setTimeout
        });
    }

    // SETUP WEB3

    connectToWeb3();
    let _10 = web3js.utils.toBN(10**10);
    let _18 = web3js.utils.toBN(10**18);
    $('#multiTokenNetworkAddress').triggerHandler('input');

});