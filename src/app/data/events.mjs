const events = [
  {
    id: '1',
    image: {
      src: '/images/event-south-shields-1.jpg',
      alt: ''
    },
    name: 'Great North Feast in the park',
    date: '27 May - 29 May 2022',
    address: {
      line1: 'Bents Park',
      line2: 'Sea Rd',
      city: 'South Shields',
      postcode: 'NE33 2LA'
    },
    articles: ['1', '2'],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2288.516753178786!2d-1.419454183928772!3d54.999106280358525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e6ed9d424b259%3A0x7fbe717441e4332f!2sBents%20Park!5e0!3m2!1sen!2suk!4v1667737339904!5m2!1sen!2suk',
    prices: [
      {
        id: '1',
        name: 'Stall - Food, not for immediate consumption',
        cost: 180
      },
      {
        id: '2',
        name: 'Stall - Makers market',
        cost: 180
      },
      {
        id: '3',
        name: 'Makers market - Space only',
        cost: 140
      },
      {
        id: '4',
        name: 'Street food - Space only',
        cost: 400
      },
      {
        id: '5',
        name: 'Electricity (£40 per day)',
        cost: 120
      }
    ]
  },
  {
    id: '2',
    image: {
      src: '/images/event-whitley-bay-1.jpg',
      alt: ''
    },
    name: 'Feast, Whitley Bay',
    date: '17 June - 18 June 2023',
    address: {
      line1: 'Spanish City Plaza',
      line2: '',
      city: 'Whitley Bay',
      postcode: 'NE26 1BG'
    },
    articles: ['3'],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d571.4375095274908!2d-1.4486599034089518!3d55.04759554081662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e6c2f6840d237%3A0xea596f7d81c24698!2sSpanish%20City!5e0!3m2!1sen!2suk!4v1667738077197!5m2!1sen!2suk',
    prices: [
      {
        id: '1',
        name: 'Street food',
        cost: 350
      },
      {
        id: '2',
        name: 'Electricity (£40 per day)',
        cost: 80
      }
    ]
  },
  {
    id: '3',
    image: {
      src: '/images/event-whitley-bay-2.jpg',
      alt: ''
    },
    name: 'Feast, Whitley Bay',
    date: '8 July - 9 July 2023',
    address: {
      line1: 'Spanish City Plaza',
      line2: '',
      city: 'Whitley Bay',
      postcode: 'NE26 1BG'
    },
    articles: ['3'],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d571.4375095274908!2d-1.4486599034089518!3d55.04759554081662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e6c2f6840d237%3A0xea596f7d81c24698!2sSpanish%20City!5e0!3m2!1sen!2suk!4v1667738077197!5m2!1sen!2suk',
    prices: [
      {
        id: '1',
        name: 'Street food',
        cost: 350
      },
      {
        id: '2',
        name: 'Electricity (£40 per day)',
        cost: 80
      }
    ]
  },
  {
    id: '4',
    image: {
      src: '/images/event-cramlington-1.jpg',
      alt: ''
    },
    name: 'Feast, Cramlington',
    date: '8 June - 9 June 2023',
    address: {
      line1: 'Seven Oaks Park',
      line2: 'Dudley Lane',
      city: 'Cramlington',
      postcode: 'NE23 6US'
    },
    articles: ['4'],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1475.616458909384!2d-1.5852965415333604!3d55.085060391413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e73087499626d%3A0x51ba3e47c361f0ae!2sSeven%20Oaks%20Park!5e0!3m2!1sen!2suk!4v1667738155967!5m2!1sen!2suk"',
    prices: [
      {
        id: '1',
        name: 'Stall - Food, not for immediate consumption',
        cost: 180
      },
      {
        id: '2',
        name: 'Stall - Makers market',
        cost: 180
      },
      {
        id: '3',
        name: 'Makers market - Space only',
        cost: 180
      },
      {
        id: '4',
        name: 'Street food - Space only',
        cost: 300
      },
      {
        id: '5',
        name: 'Electricity (£40 per day)',
        cost: 80
      }
    ]
  },
  {
    id: '5',
    image: {
      src: '/images/event-whitley-bay-3.jpg',
      alt: ''
    },
    name: 'Feast, Whitley Bay',
    date: '19 August - 20 August 2023',
    address: {
      line1: 'Spanish City Plaza',
      line2: '',
      city: 'Whitley Bay',
      postcode: 'NE26 1BG'
    },
    articles: ['3'],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d571.4375095274908!2d-1.4486599034089518!3d55.04759554081662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e6c2f6840d237%3A0xea596f7d81c24698!2sSpanish%20City!5e0!3m2!1sen!2suk!4v1667738077197!5m2!1sen!2suk',
    prices: [
      {
        id: '1',
        name: 'Street food',
        cost: 350
      },
      {
        id: '2',
        name: 'Electricity (£40 per day)',
        cost: 80
      }
    ]
  },
  {
    id: '6',
    image: {
      src: '/images/event-south-shields-2.jpg',
      alt: ''
    },
    name: 'Great North Feast in the park',
    date: '26 - 28 August 2023',
    address: {
      line1: 'Bents Park',
      line2: 'Sea Rd',
      city: 'South Shields',
      postcode: 'NE33 2LA'
    },
    articles: ['1', '2'],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2288.516753178786!2d-1.419454183928772!3d54.999106280358525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e6ed9d424b259%3A0x7fbe717441e4332f!2sBents%20Park!5e0!3m2!1sen!2suk!4v1667737339904!5m2!1sen!2suk',
    prices: [
      {
        id: '1',
        name: 'Stall - Food, not for immediate consumption',
        cost: 180
      },
      {
        id: '2',
        name: 'Stall - Makers market',
        cost: 180
      },
      {
        id: '3',
        name: 'Makers market - Space only',
        cost: 140
      },
      {
        id: '4',
        name: 'Hot food - Space only',
        cost: 400
      },
      {
        id: '5',
        name: 'Electricity (£40 per day)',
        cost: 120
      }
    ]
  }
]

export default events
