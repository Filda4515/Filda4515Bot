const { EmbedBuilder } = require("discord.js");

function mazeMove(row, column, numberGrid) {
    if (row < 0 || column < 0 || row >= numberGrid.length || column >= numberGrid[0].length) return "nothing";
    let next_number = numberGrid[row][column];
    if (next_number != 0 && next_number != 2) return "nothing";
    if (next_number == 0) numberGrid[row][column] = 3;
    for (let i = 0; i < numberGrid.length; i++) {
        for (let j = 0; j < numberGrid[i].length; j++) {
            if (numberGrid[i][j] == 0) return "edit";
        }
    }
    return "stop";
}

function haybaleMove(row, rowMove, column, columnMove, numberGrid, solutionGrid) {
    let old_row = row;
    let old_column = column;
    let new_row = row + rowMove;
    let new_column = column + columnMove;
    if (new_row < 0 || new_column < 0 || new_row >= numberGrid.length || new_column >= numberGrid[0].length) return "nothing";
    let next_number = numberGrid[new_row][new_column];
    if (next_number == 0) {
        numberGrid[old_row][old_column] = 0;
        numberGrid[new_row][new_column] = 2;
        return "move";
    }
    if (next_number == 1) {
        old_row = new_row;
        old_column = new_column;
        new_row += rowMove;
        new_column += columnMove;
        if (new_row < 0 || new_column < 0 || new_row >= numberGrid.length || new_column >= numberGrid[0].length) return "nothing";
        next_number = numberGrid[new_row][new_column];
        if (next_number == 0) {
            numberGrid[old_row-rowMove][old_column-columnMove] = 0;
            numberGrid[old_row][old_column] = 2;
            numberGrid[new_row][new_column] = 1;
            for (let i = 0; i < numberGrid.length; i++) {
                for (let j = 0; j < numberGrid[i].length; j++) {
                    if (numberGrid[i][j] == 1 && numberGrid[i][j] != solutionGrid[i][j]) return "move";
                }
            }
            return "stop";
        }
        if (next_number == 1) return "nothing";
    }
}

function computerMove(line, reaction){
    let zeroIndex = -1;
    for (let i = 0, zerosFound = 0; i < line.length; i++) {
        if (line[i] == 0) {
            zerosFound++;
            if (zerosFound == reaction) {
                zeroIndex = i;
                break;
            }
        }
    }
    if (zeroIndex == -1) return "nothing";

    let leftIndex = zeroIndex - 1;
    let rightIndex = zeroIndex + 1;
    let twoIndex = -1;
    while (leftIndex >= 0 || rightIndex < line.length) {
        if (leftIndex >= 0) {
            if (line[leftIndex] == 2) {
                twoIndex = leftIndex;
                break;
            }
            if (line[leftIndex] == 1) leftIndex = -1;
        }
        if (rightIndex < line.length) {
            if (line[rightIndex] == 2) {
                twoIndex = rightIndex;
                break;
            }
            if (line[rightIndex] == 1) rightIndex = line.length;
        }
        leftIndex--;
        rightIndex++;
    }
    if (twoIndex == -1) return "nothing";
    line[zeroIndex] = 2;
    line[twoIndex] = 0;

    let first_index = -1;
    let first_gap = -1;
    let second_index = -1;
    let second_gap = -1;
    for (let i = 0; i < line.length; i++) {
        if (line[i] == 1) {
            if (first_index == -1) first_index = i;
            else second_index = i;
        } else if (line[i] == 2) {
            if (first_gap == -1) first_gap = i - first_index;
            else {
                second_gap = i - second_index;
                break;
            }
        }
    }

    if (first_gap == 1 && second_gap == 1) {
        new_index = -1;
        one_index = -1;
        for (let i = 0; i < line.length; i++) {
            if (line[i] == 1) {
                index = i;
                one_index = i;
                while (index > 0) {
                    index--;
                    if (line[index] == 2) break;
                    if (line[index] == 0) {
                        new_index = index;
                        break;
                    }
                }
                if (new_index != -1) break;
            }
        }
        if (new_index == -1) return "stop";
        line[new_index] = 1;
        line[one_index] = 0;
    } else if (first_gap == second_gap) {
        if (first_gap > 1){
            line[first_index + 1] = 1;
            line[first_index] = 0;
        } else {
            line[second_index + 1] = 1;
            line[second_index] = 0;
        }
    } else {
        if (first_gap >= second_gap) {
            line[first_index + first_gap - second_gap] = 1;
            line[first_index] = 0;
        } else if (first_gap < second_gap) {
            line[second_index + second_gap - first_gap] = 1;
            line[second_index] = 0;
        }
    }
    return "move";
}

module.exports.run = async (bot, message, args) => {
    message.delete();

    if (!args[0]) return message.channel.send(".minigame <minihra>\nDostupné minihry: maze, haybale, computer").then(m => setTimeout(() => m.delete(), 15000));
    if (args[0] == "maze") {
		const originalNumberGrid = [
            [0,0,0,1,1,0,1,1],
            [0,0,0,1,1,2,0,1],
            [1,0,2,0,0,0,0,0],
            [0,0,0,0,0,0,1,0],
            [0,0,1,3,0,2,0,0],
            [0,0,0,0,1,0,0,0],
            [1,0,0,0,0,0,0,1]
        ];
        let numberGrid = originalNumberGrid.map(function(arr) {
            return arr.slice();
        });

        const originalPosition = [4, 3];
        let position = originalPosition.slice();

        const numberToEmoji = {
            0: "⬜️",
            1: "⬛",
            2: "🟨",
            3: "🟩"
        };
        let emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");

        let Embed = new EmbedBuilder()
        .setColor("#ebb734")
        .setAuthor({ name: "FildaGames - maze", iconURL: message.guild.iconURL() })
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .addFields({ name: "Light every white cell to green.\nYou can only walk to white and yellow cells.", value: `\`\`\`${emojiGrid}\`\`\`` })
        .setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })

        const sentMessage = await message.channel.send({ embeds: [Embed] });

        try {
			await sentMessage.react("⬆️");
			await sentMessage.react("⬅️");
			await sentMessage.react("➡️");
			await sentMessage.react("⬇️");
			await sentMessage.react("🔄");
			await sentMessage.react("❌");
		} catch (error) {
			console.error("One of the emojis failed to react:", error);
		}
        const filter = (reaction, user) => {
            return ["⬆️", "⬅️", "➡️", "⬇️", "🔄", "❌"].includes(reaction.emoji.name) && !user.bot && user.id == message.author.id;
        };

        const collector = sentMessage.createReactionCollector({ filter });

        collector.on("collect", (reaction, user) => {
            reaction.users.remove(user.id).catch(error => {return;});

            const row = position[0];
            const column = position[1];
            switch(reaction.emoji.name) {
                case "⬆️":
                    result = mazeMove(row-1, column, numberGrid);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    if (result == "edit") {
                        position = [row-1, column];
                        emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");
                        let newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Light every white cell to green.\nYou can only walk to white and yellow cells.", value: `\`\`\`${emojiGrid}\`\`\`` });
                        return sentMessage.edit({ embeds: [newEmbed] });
                    }
                case "⬅️":
                    result = mazeMove(row, column-1, numberGrid);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    if (result == "edit") {
                        position = [row, column-1];
                        emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");
                        let newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Light every white cell to green.\nYou can only walk to white and yellow cells.", value: `\`\`\`${emojiGrid}\`\`\`` });
                        return sentMessage.edit({ embeds: [newEmbed] });
                    }
                case "➡️":
                    result = mazeMove(row,  column+1, numberGrid);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    if (result == "edit") {
                        position = [row, column+1];
                        emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");
                        let newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Light every white cell to green.\nYou can only walk to white and yellow cells.", value: `\`\`\`${emojiGrid}\`\`\`` });
                        return sentMessage.edit({ embeds: [newEmbed] });
                    }
                case "⬇️":
                    result = mazeMove(row+1, column, numberGrid);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    if (result == "edit") {
                        position = [row+1, column];
                        emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");
                        let newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Light every white cell to green.\nYou can only walk to white and yellow cells.", value: `\`\`\`${emojiGrid}\`\`\`` });
                        return sentMessage.edit({ embeds: [newEmbed] });
                    }
                case "🔄":
                    numberGrid = originalNumberGrid.map(function(arr) {
                        return arr.slice();
                    });
                    position = originalPosition;
                    emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Light every white cell to green.\nYou can only walk to white and yellow cells.", value: `\`\`\`${emojiGrid}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "❌":
                    return collector.stop("quit");
                default:
                    return;
            }
        });

        collector.on("end", (collected, reason) => {
            if (reason && reason == "quit")  {
                sentMessage.delete();
                return message.channel.send("Minihra byla manuálně ukončena.").then(m => setTimeout(() => m.delete(), 5000));
            }
            if (reason && reason == "complete")  {
                sentMessage.delete();
                message.channel.send("Úspěšně jsi vyhrál minihru!").then(m => setTimeout(() => m.delete(), 5000));
                return;
            }
        });
        return;
    } else if (args[0] == "haybale") {
        const solutionNumberGrid = [
            [0,0,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,1,0,0],
            [0,0,1,1,1,1,1,0,0],
            [0,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ];
        const originalNumberGrid = [
            [2,0,0,0,0,0,0,0,0],
            [0,0,0,1,1,1,0,1,0],
            [0,0,1,0,1,1,0,0,0],
            [0,0,0,0,0,0,0,1,0],
            [0,1,0,0,0,1,0,0,0],
            [0,0,1,0,0,0,0,0,0],
            [0,0,0,0,1,1,0,1,0],
            [0,0,0,0,0,0,0,0,0]
        ];
        let numberGrid = originalNumberGrid.map(function(arr) {
            return arr.slice();
        });

        const originalPosition = [0, 0];
        let position = originalPosition.slice();

        const numberToEmoji = {
            0: "🟫",
            1: "🟨",
            2: "🟦"
        };
        let emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");

        let Embed = new EmbedBuilder()
        .setColor("#ebb734")
        .setAuthor({ name: "FildaGames - haybale", iconURL: message.guild.iconURL() })
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .addFields({ name: "Make yellow symmetrical T in the center.\nYou can push haybales.", value: `\`\`\`${emojiGrid}\`\`\`` })
        .setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })

        const sentMessage = await message.channel.send({ embeds: [Embed] });

        try {
			await sentMessage.react("⬆️");
			await sentMessage.react("⬅️");
			await sentMessage.react("➡️");
			await sentMessage.react("⬇️");
			await sentMessage.react("🔄");
			await sentMessage.react("❌");
		} catch (error) {
			console.error("One of the emojis failed to react:", error);
		}
        const filter = (reaction, user) => {
            return ["⬆️", "⬅️", "➡️", "⬇️", "🔄", "❌"].includes(reaction.emoji.name) && !user.bot && user.id == message.author.id;
        };

        const collector = sentMessage.createReactionCollector({ filter });

        collector.on("collect", (reaction, user) => {
            reaction.users.remove(user.id).catch(error => {return;});

            const row = position[0];
            const column = position[1];
            let newEmbed;
            switch(reaction.emoji.name) {
                case "⬆️":
                    result = haybaleMove(row, -1, column, 0, numberGrid, solutionNumberGrid);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    if (result == "move") {
                        position = [row-1, column];
                        emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");
                        let newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Make yellow symmetrical T in the center.\nYou can push haybales.", value: `\`\`\`${emojiGrid}\`\`\`` });
                        return sentMessage.edit({ embeds: [newEmbed] });
                    }
                case "⬅️":
                    result = haybaleMove(row, 0, column, -1, numberGrid, solutionNumberGrid);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    if (result == "move") {
                        position = [row, column-1];
                        emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");
                        let newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Make yellow symmetrical T in the center.\nYou can push haybales.", value: `\`\`\`${emojiGrid}\`\`\`` });
                        return sentMessage.edit({ embeds: [newEmbed] });
                    }
                case "➡️":
                    result = haybaleMove(row, 0, column, 1, numberGrid, solutionNumberGrid);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    if (result == "move") {
                        position = [row, column+1];
                        emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");
                        let newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Make yellow symmetrical T in the center.\nYou can push haybales.", value: `\`\`\`${emojiGrid}\`\`\`` });
                        return sentMessage.edit({ embeds: [newEmbed] });
                    }
                case "⬇️":
                    result = haybaleMove(row, 1, column, 0, numberGrid, solutionNumberGrid);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    if (result == "move") {
                        position = [row+1, column];
                        emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");
                        let newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Make yellow symmetrical T in the center.\nYou can push haybales.", value: `\`\`\`${emojiGrid}\`\`\`` });
                        return sentMessage.edit({ embeds: [newEmbed] });
                    }
                case "🔄":
                    numberGrid = originalNumberGrid.map(function(arr) {
                        return arr.slice();
                    });
                    position = originalPosition;
                    emojiGrid = numberGrid.map(row => row.map(cell => numberToEmoji[cell]).join("")).join("\n");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Make yellow symmetrical T in the center.\nYou can push haybales.", value: `\`\`\`${emojiGrid}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "❌":
                    return collector.stop("quit");
                default:
                    return;
            }
        });

        collector.on("end", (collected, reason) => {
            if (reason && reason == "quit")  {
                sentMessage.delete();
                return message.channel.send("Minihra byla manuálně ukončena.").then(m => setTimeout(() => m.delete(), 5000));
            }
            if (reason && reason == "complete")  {
                sentMessage.delete();
                message.channel.send("Úspěšně jsi vyhrál minihru!").then(m => setTimeout(() => m.delete(), 5000));
                return;
            }
        });
        return;
    } else if (args[0] == "computer") {

        const originalLine = [1,0,0,0,2,0,0,1,0,0,2,0,0];
        let numberLine = originalLine.slice();

        const numberToEmoji = {
            0: "⬜️",
            1: "🟥",
            2: "🟦"
        };
        const numberEmojis = ["❌", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
        let zerosFound = 0;
        let second_line = numberLine.map((value, index) => {
            if (value == 0) return numberEmojis[++zerosFound];
            else return numberEmojis[0];
        });
        let emojiLine = numberLine.map(cell => numberToEmoji[cell]).join("") + "\n\n" + second_line.join("");

        let Embed = new EmbedBuilder()
        .setColor("#ebb734")
        .setAuthor({ name: "FildaGames - computer", iconURL: message.guild.iconURL() })
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .addFields({ name: "Suffocate red squares.\nReaction number is nth white square where to move.", value: `\`\`\`${emojiLine}\`\`\`` })
        .setFooter({ text: "Filda4515 Bot", iconURL: bot.user.displayAvatarURL() })

        const sentMessage = await message.channel.send({ embeds: [Embed] });

        try {
			await sentMessage.react("1️⃣");
			await sentMessage.react("2️⃣");
			await sentMessage.react("3️⃣");
			await sentMessage.react("4️⃣");
			await sentMessage.react("5️⃣");
			await sentMessage.react("6️⃣");
			await sentMessage.react("7️⃣");
			await sentMessage.react("8️⃣");
			await sentMessage.react("9️⃣");
            await sentMessage.react("🔄");
			await sentMessage.react("❌");
		} catch (error) {
			console.error("One of the emojis failed to react:", error);
		}
        const filter = (reaction, user) => {
            return ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔄", "❌"].includes(reaction.emoji.name) && !user.bot && user.id == message.author.id;
        };

        const collector = sentMessage.createReactionCollector({ filter });

        collector.on("collect", (reaction, user) => {
            reaction.users.remove(user.id).catch(error => {return;});

            switch(reaction.emoji.name) {
                case "1️⃣":
                    result = computerMove(numberLine, 1);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    zerosFound = 0;
                    second_line = numberLine.map((value, index) => {
                        if (value == 0) return numberEmojis[++zerosFound];
                        else return numberEmojis[0];
                    });
                    emojiLine = numberLine.map(cell => numberToEmoji[cell]).join("") + "\n\n" + second_line.join("");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Suffocate red squares.\nReaction number is nth white square where to move.", value: `\`\`\`${emojiLine}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "2️⃣":
                    result = computerMove(numberLine, 2);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    zerosFound = 0;
                    second_line = numberLine.map((value, index) => {
                        if (value == 0) return numberEmojis[++zerosFound];
                        else return numberEmojis[0];
                    });
                    emojiLine = numberLine.map(cell => numberToEmoji[cell]).join("") + "\n\n" + second_line.join("");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Suffocate red squares.\nReaction number is nth white square where to move.", value: `\`\`\`${emojiLine}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "3️⃣":
                    result = computerMove(numberLine, 3);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    zerosFound = 0;
                    second_line = numberLine.map((value, index) => {
                        if (value == 0) return numberEmojis[++zerosFound];
                        else return numberEmojis[0];
                    });
                    emojiLine = numberLine.map(cell => numberToEmoji[cell]).join("") + "\n\n" + second_line.join("");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Suffocate red squares.\nReaction number is nth white square where to move.", value: `\`\`\`${emojiLine}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "4️⃣":
                    result = computerMove(numberLine, 4);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    zerosFound = 0;
                    second_line = numberLine.map((value, index) => {
                        if (value == 0) return numberEmojis[++zerosFound];
                        else return numberEmojis[0];
                    });
                    emojiLine = numberLine.map(cell => numberToEmoji[cell]).join("") + "\n\n" + second_line.join("");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Suffocate red squares.\nReaction number is nth white square where to move.", value: `\`\`\`${emojiLine}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "5️⃣":
                    result = computerMove(numberLine, 5);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    zerosFound = 0;
                    second_line = numberLine.map((value, index) => {
                        if (value == 0) return numberEmojis[++zerosFound];
                        else return numberEmojis[0];
                    });
                    emojiLine = numberLine.map(cell => numberToEmoji[cell]).join("") + "\n\n" + second_line.join("");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Suffocate red squares.\nReaction number is nth white square where to move.", value: `\`\`\`${emojiLine}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "6️⃣":
                    result = computerMove(numberLine, 6);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    zerosFound = 0;
                    second_line = numberLine.map((value, index) => {
                        if (value == 0) return numberEmojis[++zerosFound];
                        else return numberEmojis[0];
                    });
                    emojiLine = numberLine.map(cell => numberToEmoji[cell]).join("") + "\n\n" + second_line.join("");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Suffocate red squares.\nReaction number is nth white square where to move.", value: `\`\`\`${emojiLine}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "7️⃣":
                    result = computerMove(numberLine, 7);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    zerosFound = 0;
                    second_line = numberLine.map((value, index) => {
                        if (value == 0) return numberEmojis[++zerosFound];
                        else return numberEmojis[0];
                    });
                    emojiLine = numberLine.map(cell => numberToEmoji[cell]).join("") + "\n\n" + second_line.join("");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Suffocate red squares.\nReaction number is nth white square where to move.", value: `\`\`\`${emojiLine}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "8️⃣":
                    result = computerMove(numberLine, 8);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    zerosFound = 0;
                    second_line = numberLine.map((value, index) => {
                        if (value == 0) return numberEmojis[++zerosFound];
                        else return numberEmojis[0];
                    });
                    emojiLine = numberLine.map(cell => numberToEmoji[cell]).join("") + "\n\n" + second_line.join("");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Suffocate red squares.\nReaction number is nth white square where to move.", value: `\`\`\`${emojiLine}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "9️⃣":
                    result = computerMove(numberLine, 9);
                    if (result == "nothing") return;
                    if (result == "stop") return collector.stop("complete");
                    zerosFound = 0;
                    second_line = numberLine.map((value, index) => {
                        if (value == 0) return numberEmojis[++zerosFound];
                        else return numberEmojis[0];
                    });
                    emojiLine = numberLine.map(cell => numberToEmoji[cell]).join("") + "\n\n" + second_line.join("");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Suffocate red squares.\nReaction number is nth white square where to move.", value: `\`\`\`${emojiLine}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "🔄":
                    numberLine = originalLine.slice();
                    zerosFound = 0;
                    second_line = numberLine.map((value, index) => {
                        if (value == 0) return numberEmojis[++zerosFound];
                        else return numberEmojis[0];
                    });
                    emojiLine = numberLine.map(cell => numberToEmoji[cell]).join("") + "\n\n" + second_line.join("");
                    newEmbed = EmbedBuilder.from(Embed).setFields({ name: "Suffocate red squares.\nReaction number is nth white square where to move.", value: `\`\`\`${emojiLine}\`\`\`` });
                    return sentMessage.edit({ embeds: [newEmbed] });
                case "❌":
                    return collector.stop("quit");
                default:
                    return;
            }
        });

        collector.on("end", (collected, reason) => {
            if (reason && reason == "quit")  {
                sentMessage.delete();
                return message.channel.send("Minihra byla manuálně ukončena.").then(m => setTimeout(() => m.delete(), 5000));
            }
            if (reason && reason == "complete")  {
                sentMessage.delete();
                message.channel.send("Úspěšně jsi vyhrál minihru!").then(m => setTimeout(() => m.delete(), 5000));
                return;
            }
        });
        return;
    } else return message.channel.send(".minigame <minihra>\nDostupné minihry: maze, haybale, computer").then(m => setTimeout(() => m.delete(), 15000));
}

module.exports.config = {
	name: "minigame",
	aliases: []
}