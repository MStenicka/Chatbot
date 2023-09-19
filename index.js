import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(
    colors.bold.blue('Hi, I am Chatbot, You can start chatting with me.'),
  );

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.bold.green('You: '));

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({ role: 'user', content: userInput });

      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      const completionText = chatCompletion.choices[0].message.content;

      if (userInput.toLowerCase() === 'exit') {
        console.log(
          colors.bold.blue('Bot: ') + colors.bold.blue(completionText),
        );
        return;
      }

      console.log(colors.bold.blue('Bot: ') + colors.bold.blue(completionText));

      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
