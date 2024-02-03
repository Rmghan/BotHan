const { SlashCommandBuilder } = require ('discord.js');

const dkButton = require('../../components/dkButton');
const skillSection = require('../../components/skillSection');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('testi')
		.setDescription('Checking for Actionrows'),

	async execute(interaction) {
		const row = dkButton();
		const response = await interaction.reply({ content: 'This Message should have Action rows underneath it', components : [row] });
		try {
			await updateResponse(response, row);
		}
		catch (e) {
			console.log(e);
			await interaction.editReply({ component: [] });
		}
	},
};

async function updateResponse(response, row) {
	const confirmation = await response.awaitMessageComponent();
	const customId = confirmation.customId;
	
	if (customId === 'button1') {
		await confirmation.update(skillSection());
	}
	else if (customId === 'button2') {
		await confirmation.update({ content: 'You pressed button 2 eww', components: [row] });
	}
	await updateResponse(response, row);
}
