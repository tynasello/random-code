const mainCards = [
    {
        title: 'Favourite',
        image: 'redpanda',
    },
    {
        title: 'Coolest Looking',
        image: 'eyelashviper',
    },
];

const animals = [
    {
        image: 'lion',
        species: 'Lion',
        family: 'Felidae',
        desc: [
            'The lion is a large cat of the genus Panthera native to Africa and India. It has a muscular, deep-chested body, short, rounded head, round ears, and a hairy tuft at the end of its tail. It is sexually dimorphic; adult male lions are larger than females and have a prominent mane.',
        ],
        animalClass: 'Mammal',
    },
    {
        image: 'leopard',
        species: 'Leopard',
        family: 'Felidae',
        desc: [
            'The leopard is one of the five extant species in the genus Panthera, a member of the cat family, Felidae. It occurs in a wide range in sub-Saharan Africa, in some parts of Western and Central Asia, Southern Russia, and on the Indian subcontinent to Southeast and East Asia.',
        ],
        animalClass: 'Mammal',
    },
    {
        image: 'angelfish',
        species: 'Angel Fish',
        family: 'Cichlidae',
        desc: [
            'Pterophyllum is a small genus of freshwater fish from the family Cichlidae known to most aquarists as angelfish. All Pterophyllum species originate from the Amazon Basin, Orinoco Basin and various rivers in the Guiana Shield in tropical South America.',
        ],
        animalClass: 'Fish',
    },
    {
        image: 'eyelashviper',
        species: 'Eyelash Viper',
        family: 'Viperidae',
        desc: [
            'Bothriechis schlegelii, known commonly as the eyelash viper, is a species of venomous pit viper in the family Viperidae. The species is native to Central and South America. Small and arboreal, this species is characterized by a wide array of color variations, as well as the superciliary scales above the eyes.',
        ],
        animalClass: 'Reptile',
    },
    {
        image: 'bluejellyfish',
        species: 'Blue Jellyfish',
        family: 'Cyaneidae',
        desc: [
            'Cyanea lamarckii, also known as the blue jellyfish or bluefire jellyfish, is a species of jellyfish in the family Cyaneidae.',
        ],
        animalClass: 'Invertebrate',
    },
    {
        image: 'kihansispraytoad',
        species: 'Kihansi Spray Toad',
        family: 'Bufonidae',
        desc: [
            'The Kihansi spray toad is a small toad endemic to Tanzania. The species is live-bearing and insectivorous. The Kihansi spray toad is currently categorized as "Extinct in the wild" by the International Union for Conservation of Nature, though the species persists in ex situ, captive breeding populations.',
        ],
        animalClass: 'Amphibian',
    },
    {
        image: 'redpanda',
        species: 'Red Panda',
        family: 'Ailuridae',
        desc: [
            'The red panda is a carnivoran native to the eastern Himalayas and southwestern China. It is listed as Endangered on the IUCN Red List because the wild population is estimated at fewer than 10,000 mature individuals and continues to decline due to habitat loss and fragmentation, poaching, and inbreeding depression.',
        ],
        animalClass: 'Mammal',
    },
    {
        image: 'kingfisher',
        species: 'King Fisher',
        family: 'Alcedinidae',
        desc: [
            'Kingfishers or Alcedinidae are a family of small to medium-sized, brightly colored birds in the order Coraciiformes. They have a cosmopolitan distribution, with most species found in the tropical regions of Africa, Asia, and Oceania but also can be seen in Europe.',
        ],
        animalClass: 'Bird',
    },
    {
        image: 'clownfish',
        species: 'Clown Fish',
        family: 'Pomacentridae',
        desc: [
            'Clownfish or anemonefish are fishes from the subfamily Amphiprioninae in the family Pomacentridae. Thirty species are recognized: one in the genus Premnas, while the remaining are in the genus Amphiprion. In the wild, they all form symbiotic mutualisms with sea anemones.',
        ],
        animalClass: 'Fish',
    },
];

const animalClasses = [
    {
        animalClassName: 'Mammal',
        image: 'lion',
    },
    {
        animalClassName: 'Reptile',
        image: 'crocodile',
    },
    {
        animalClassName: 'Amphibian',
        image: 'frog',
    },
    {
        animalClassName: 'Bird',
        image: 'bluejay',
    },
    {
        animalClassName: 'Invertebrate',
        image: 'jellyfish',
    },
    {
        animalClassName: 'Fish',
        image: 'salmon',
    },
];

module.exports = {
    mainCards,
    animals,
    animalClasses,
};
