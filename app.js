require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const Category = require("./category.module");
const User = require("./user.model");
const Ad = require("./ad.module");

mongoose.connect(process.env.MONGODB_CONNETION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let ads = [
  {
    name: "HYPERX Pamięć DDR4 Fury 16GB/3000 CL15 czarna",
    descripton:
      "Pamięć HyperX FURY DDR4 automatycznie przetaktowuje się do najwyższej obsługiwanej częstotliwości, aż do 3466MHz. Oznacza to płynniejsze działanie gier oraz szybszy montaż i renderowanie filmów w technologii Plug and Play. Pamięć FURY DDR4 obsługuje profile XMP i oferuje częstotliwości taktowania od 2400MHz do 3466MHz oraz opóźnienia CL15 i CL16. Pojemności pojedynczych modułów wynoszą od 4GB do 16GB, a pojemności zestawów od 16GB do 64GB. Moduły o częstotliwościach 2400MHz oraz 2666MHz obsługują funkcję automatycznego przetaktowywania Plug and Play i są zgodne z najnowszymi procesorami Intel i AMD. Chłodzenie zapewnia stylowy, niskoprofilowy radiator. Każdy moduł pamięci FURY DDR4 przechodzi testy przy pełnej szybkości i jest objęty wieczystą gwarancją. To bezproblemowa i przystępna cenowo modernizacja systemu.",
    price: 393.51,
    amount: 5,
    dateAdded: new Date(2019, 10, 15),
  },
  {
    name: "Pamięć RAM 8GB (2x4GB) DDR3 1600MHz!",
    descripton: `Specyfikacja:
  Pojemność: 8GB (2x4GBGB)
  Rodzaj złącza: DDR3
  Taktowanie: 1600 MHz (PC3-12800)
  Napięcie: 1,5V
  Pamięci o częstotliwości 1066MHz oraz 1333 MHz możesz znaleźć na moim profilu.`,
    price: 128.0,
    amount: 30,
    dateAdded: new Date(2019, 11, 15),
  },
  {
    name: "NOWA PAMIĘĆ RAM 2GB DDR2 800MHZ(2x1GBDUAL) PC-6400",
    descripton: `SPECYFIKACJA:
    Pojemność:    
    2 GB (2048MB) 2x 1GB (2x 1024MB)
    Rodzaj pamięci:    
    DDR2
    Taktowanie:    
    800MHz (PC-6400)
    Liczba pinów:    
    240
    Napięcie:    
    1,8V
    Typ podzespołu:    
    Pamięć RAM do komputerów stacjonarnych
    Wersja opakowania:    
    OEM`,
    price: 29.98,
    amount: 20,
    dateAdded: new Date(2020, 3, 15),
  },
  {
    name: "8GB 800MHZ DDR2 PAMIĘĆ RAM 2x4GB NOWA DO AMD",
    descripton: `PAMIĘĆ RAM 8GB 800MHZ DDR2 PC2-6400
      POJEMNOŚĆ: 8GB (2X4GB)
      CZĘSTOTLIWOŚĆ: 800MHZ
      RODZAJ ZŁĄCZA: DDR2 DIMM
      OPÓŹNIENIE: CL6
      PAMIĘĆ PRZEZNACZONA DO KOMPUTERA STACJONARNEGO Z CHIPSETEM AMD`,
    price: 80.0,
    amount: 15,
    dateAdded: new Date(2020, 5, 25),
  },
  {
    name: "NOWA Pamięć 2x 1GB DDR 400 MHZ PC-3200 2 GB + FV",
    descripton: `Gwarancja 5 lat
    Rodzaj pamięci: DDR1 
    Pojemność: 2x 1024 Mb
    Częstotliwość pracy: 400 Mhz
    Opóźnienie: CL2,5
    Ilość chipów: dwustronna 16 Chip
    Obsługa ECC: nie
    Interfejs: 184 piny`,
    price: 48.0,
    amount: 12,
    dateAdded: new Date(2020, 9, 14),
  },
];

(async () => {
  const users = await User.find();
  const ddr4 = await Category.findOne({ name: "DDR4" });
  const ddr3 = await Category.findOne({ name: "DDR3" });
  const ddr2 = await Category.findOne({ name: "DDR2" });
  const ddr = await Category.findOne({ name: "DDR" });
  const computer = await Category.findOne({ name: /komputery/i });

  await new Ad({
    ...ads[0],
    categories: [ddr4, computer],
    author: users[0],
  }).save();
  // console.log(users, categories);
})();
