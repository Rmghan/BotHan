const buffNameList = { 'Guts':true, 'Skill Rank Up':true, 'C. Star Gain Per Turn':true,
	'HP Loss':true, 'Damage Cut':true, 'Max HP Plus':true, 'HP Recovery Per Turn':true,
	'C. Star Gain':true, '':true, 'Command Card Type Change':true, 'ATK Plus':true };
const npGainBuff = { 'NP Gain': true, 'NP Gain Per Turn':true };

const servantStateIDs = ['304800'];
const classMod = { saber: 1.0, lancer: 1.05, archer:0.95, rider: 1.0, caster: 0.9,
	assassin: 0.9, beserker: 1.1, shielder: 1.0, ruler: 1.1, avenger: 1.1, mooncancer: 1.0,
	alterego: 1.0, foreigner: 1.0, pretender:1.0, beast: 1.0 };
const cardTypeMod = { buster: 1.5, arts: 1.0, quick: 0.8 };

module.exports = {
	buffNameList, npGainBuff, servantStateIDs, classMod, cardTypeMod,
};