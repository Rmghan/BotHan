const { SlashCommandBuilder } = require('discord.js');
// const servantURL = 'https://api.atlasacademy.io/export/NA/basic_servant.json';
// const ceurl = 'https://api.atlasacademy.io/export/NA/nice_equip.json';
module.exports = {
	data: new SlashCommandBuilder()
		.setName('meta')
		.setDescription('Selected system')
		.addStringOption(option =>
			option.setName('system')
				.setDescription('meta system')
				.setRequired(true)
				.addChoices(
					{ name: 'SS', value: '3.2' },
					{ name: 'SSO', value: '5.12' },
					{ name: 'SOO', value: '4.576' },
					{ name: 'CC', value: '2.8' },
					{ name: 'CCO', value: '4.48' },
					{ name: 'COO', value: '3.96' },
					{ name: 'KK', value: '2' },
					{ name: 'KKO', value: '4' },
					{ name: 'KOO', value: '5.5' },
					{ name: 'S_SS', value: '3.22' },
					{ name: 'S_SSO', value: '5.152' },
					{ name: 'S_SOO', value: '4.356' },

				))
		.addIntegerOption(option =>
			option.setName('servant_atk')
				.setDescription('atk stat of your servant')
				.setRequired(true))

		.addIntegerOption(option =>
			option.setName('np_dmg_value')
				.setDescription('np dmg value')
				.setRequired(true)),


	async execute(interaction) {
		const servant_atk = (interaction.options.getInteger('servant_atk'));
		const meta_system = (interaction.options.getString('system'));
		const np_dmg_value = (interaction.options.getInteger('np_dmg_value'));
		const total = (Number(meta_system)) * servant_atk * 0.23 * np_dmg_value;
		await (interaction).reply(`the result is ${total}`);

	},
};