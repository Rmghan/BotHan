const { SlashCommandBuilder } = require('discord.js');
const { getServantList } = require('../../fetch');
// const { makeEmbedServant } = require('../../embedservant.js');
const { classMod, cardTypeMod } = require('../../constants');
module.exports = {


	data: new SlashCommandBuilder()
		.setName('npdmg')
		.setDescription('Calculates NP Damage')
		.addIntegerOption(option =>
			option.setName('servantid')
				.setDescription('NA saint graph number of servant')
				.setRequired(true)
				.setAutocomplete(true),
		),

	async execute(interaction) {
		await (interaction).deferReply();
		const servantnumber = await interaction.options.getInteger('servantid');
		const servant = (await getServantList()).find(e => e.id === servantnumber);
		const dmg = await npDmgCalc(servant);
		await (interaction).editReply({ content: `NP damage: ${dmg}` });
	},
	async autocomplete(interaction) {

		const focusedValue = interaction.options.getFocused().toLowerCase();
		const possibleServants = (await getServantList()).filter(e => e.name.toLowerCase().startsWith(focusedValue)).slice(0, 25);
		await interaction.respond(
			possibleServants.map(x => ({ name: `${x.className} ${x.name}`, value: x.id })),
		);
	},
};
/*
function typeBuffCalc(servant) {
// work in progress
}
function atkUpCalc(servant) {
// work in progress
}
function npAmpCalc(servant) {
// work in progress
}
function spAtkCalc(servant) {
// work in progress
}
*/
function npDmgCalc(servant) {

	const servantAtk = (1000 + servant.atkMax);
	const classMult = classMod[servant.className];
	const typeMod = cardTypeMod[servant.noblePhantasms[0].card];
	const damage = servantAtk * classMult * typeMod * 0.23;
	//	const damage = servantAtk * classMult * atkMod * typeMod * npMod * npValue * 0.23;

	return damage;
}

