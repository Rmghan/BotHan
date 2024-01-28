const { SlashCommandBuilder } = require('discord.js');
const { getServantList } = require('../../fetch');
const { makeEmbedObject } = require('../../embedobject');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('servant')
		.setDescription('Replies with NA Servant names')
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
		const embedpng = await makeEmbedObject(servant);
		await (interaction).editReply({ embeds: [embedpng] });
	},
	async autocomplete(interaction) {

		const focusedValue = interaction.options.getFocused().toLowerCase();
		const possibleServants = (await getServantList()).filter(e => e.name.toLowerCase().startsWith(focusedValue)).slice(0, 25);
		await interaction.respond(
			possibleServants.map(x => ({ name: `${x.className} ${x.name}`, value: x.id })),
		);
	},
};

// `Max Atk: ${servant.atkMax} \n Max HP: ${servant.hpMax} \n Attribute: ${servant.attribute}`