export class Command {
  settings = {
    name: "animalhunt",
    description: "You went hunting and caught an animal!",
    noPrefix: true,
  };

  async main({ send }) {
    const animals = {
      lion: "🦁",
      tiger: "🐅",
      bear: "🐻",
      elephant: "🐘",
      giraffe: "🦒",
      fish: "🐟",
      zebra: "🦓",
      kangaroo: "🦘",
      panda: "🐼",
      monkey: "🐒",
      wolf: "🐺",
      fox: "🦊",
      eagle: "🦅",
      owl: "🦉",
      rabbit: "🐰",
      deer: "🦌",
      horse: "🐴",
      hippopotamus: "🦛",
      rhino: "🦏",
      cheetah: "🐆",
      penguin: "🐧",
      parrot: "🦜",
      seal: "🦭",
      dolphin: "🐬",
      shark: "🦈",
      octopus: "🐙",
      crab: "🦀",
      whale: "🐋",
      jellyfish: " medusa",
      walrus: "🦭",
      platypus: "🦦",
    };
    if (Math.random() > 0.5) {
      return send(
        `You went hunting but didn't find any animals this time. Better luck next time!`,
      );
    }

    const animalNames = Object.keys(animals);
    const randomIndex = Math.floor(Math.random() * animalNames.length);
    const caughtAnimal = animalNames[randomIndex];
    const animalEmoji = animals[caughtAnimal];

    send(`You went hunting and caught a ${animalEmoji} ${caughtAnimal}!`);
  }
}
