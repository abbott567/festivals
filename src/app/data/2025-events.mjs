import { isBefore, isAfter, parseISO } from 'date-fns'

const all = [
  {
    id: '1',
    image: {
      src: '/images/event-south-shields-1.jpg',
      alt: ''
    },
    name: 'Great North Feast in the park',
    date: {
      pretty: '24 May to 26 May 2025',
      start: '2025-05-24',
      end: '2025-05-26'
    },
    address: {
      line1: 'Bents Park',
      line2: 'Sea Rd',
      city: 'South Shields',
      postcode: 'NE33 2LA'
    },
    details: `
      <p>
        Bents park is a huge event space overlooking the sea and situation between 
        Sheerans amusement park and marine park, with it's steam train, bars and 
        restaurants.
      </p>
      <p>
        We've ran these event for many years, they attract thousands of visitors 
        each year and are a favourite on the local calendar.
      </p>
    `,
    fbgroup: 'https://fb.me/e/36KtBX1rX',
    articles: ['1', '2'],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2288.516753178786!2d-1.419454183928772!3d54.999106280358525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e6ed9d424b259%3A0x7fbe717441e4332f!2sBents%20Park!5e0!3m2!1sen!2suk!4v1667737339904!5m2!1sen!2suk',
    prices: [
      {
        id: '1',
        name: 'Indoor Marquee Stall - Food, not for immediate consumption',
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
        cost: 100
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
    name: 'Feast by the sea',
    date: {
      pretty: '21 June to 22 June 2025',
      start: '2025-06-21',
      end: '2025-06-22'
    },
    address: {
      line1: 'Spanish City Plaza',
      line2: '',
      city: 'Whitley Bay',
      postcode: 'NE26 1BG'
    },
    fbgroup: 'https://fb.me/e/3aGRG24Gm',
    details: `
      <p>
        Spanish City is a recently developed sea-front event space on the old 
        amusement park. It is recognisable by the gleaming Spanish City dome home 
        to cafes and shops.
      </p>
      <p>
        We have been running events here for more than 10 years and are attended 
        by thousands of visitors.
      </p>
      <p>
        The sea-front and Park View shopping areas are also a must when visiting.
      </p>
    `,
    articles: ['3'],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d571.4375095274908!2d-1.4486599034089518!3d55.04759554081662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e6c2f6840d237%3A0xea596f7d81c24698!2sSpanish%20City!5e0!3m2!1sen!2suk!4v1667738077197!5m2!1sen!2suk',
    prices: [
      {
        id: '1',
        name: 'Street food (limited to 10 vendors)',
        cost: 400
      },
      {
        id: '2',
        name: 'Electricity (£40 per day)',
        cost: 80
      },
      {
        id: '3',
        name: 'Producer stall (space only)',
        cost: 150
      }
    ]
  },
  {
    id: '3',
    image: {
      src: '/images/event-whitley-bay-2.jpg',
      alt: ''
    },
    name: 'Feast by the sea',
    date: {
      pretty: '26 July to 27 July 2025',
      start: '2025-07-26',
      end: '2025-07-27'
    },
    address: {
      line1: 'Spanish City Plaza',
      line2: '',
      city: 'Whitley Bay',
      postcode: 'NE26 1BG'
    },
    fbgroup: 'https://fb.me/e/3aGRG24Gm',
    details: `
      <p>
        Spanish City is a recently developed sea-front event space on the old 
        amusement park. It is recognisable by the gleaming Spanish City dome home 
        to cafes and shops.
      </p>
      <p>
        We have been running events here for more than 10 years and are attended 
        by thousands of visitors.
      </p>
      <p>
        The sea-front and Park View shopping areas are also a must when visiting.
      </p>
    `,
    articles: ['3'],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d571.4375095274908!2d-1.4486599034089518!3d55.04759554081662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e6c2f6840d237%3A0xea596f7d81c24698!2sSpanish%20City!5e0!3m2!1sen!2suk!4v1667738077197!5m2!1sen!2suk',
    prices: [
      {
        id: '1',
        name: 'Street food (limited to 10 vendors)',
        cost: 400
      },
      {
        id: '2',
        name: 'Electricity (£40 per day)',
        cost: 80
      },
      {
        id: '3',
        name: 'Producer stall (space only)',
        cost: 150
      }
    ]
  },
  {
    id: '4',
    image: {
      src: '/images/event-south-shields-2.jpg',
      alt: ''
    },
    name: 'Great North Feast in the park',
    date: {
      pretty: '23 to 25 August 2025',
      start: '2025-08-23',
      end: '2025-08-25'
    },
    address: {
      line1: 'Bents Park',
      line2: 'Sea Rd',
      city: 'South Shields',
      postcode: 'NE33 2LA'
    },
    details: `
      <p>
        Bents park is a huge event space overlooking the sea and situation between 
        Sheerans amusement park and marine park, with it's steam train, bars and 
        restaurants.
      </p>
      <p>
        We've ran these event for many years, they attract thousands of visitors 
        each year and are a favourite on the local calendar.
      </p>
    `,
    fbgroup: 'https://fb.me/e/6gMlViiec',
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
        cost: 100
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
  },
  {
    id: '5',
    image: {
      src: '/images/event-whitley-bay-3.jpg',
      alt: ''
    },
    name: 'Feast by the sea',
    date: {
      pretty: '30 August to 31 August 2025',
      start: '2025-08-30',
      end: '2025-08-31'
    },
    address: {
      line1: 'Spanish City Plaza',
      line2: '',
      city: 'Whitley Bay',
      postcode: 'NE26 1BG'
    },
    fbgroup: 'https://fb.me/e/3aGRG24Gm',
    details: `
      <p>
        Spanish City is a recently developed sea-front event space on the old 
        amusement park. It is recognisable by the gleaming Spanish City dome home 
        to cafes and shops.
      </p>
      <p>
        We have been running events here for more than 10 years and are attended 
        by thousands of visitors.
      </p>
      <p>
        The sea-front and Park View shopping areas are also a must when visiting.
      </p>
    `,
    articles: ['3'],
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d571.4375095274908!2d-1.4486599034089518!3d55.04759554081662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e6c2f6840d237%3A0xea596f7d81c24698!2sSpanish%20City!5e0!3m2!1sen!2suk!4v1667738077197!5m2!1sen!2suk',
    prices: [
      {
        id: '1',
        name: 'Street food (limited to 10 vendors)',
        cost: 400
      },
      {
        id: '2',
        name: 'Electricity (£40 per day)',
        cost: 80
      },
      {
        id: '3',
        name: 'Producer stall (space only)',
        cost: 150
      }
    ]
  }
]

function getPreviousEvents (events) {
  return events.filter(event => isBefore(parseISO(event.date.end), new Date()))
}

function getUpcomingEvents (events) {
  return events.filter(event => isAfter(parseISO(event.date.start), new Date()))
}

export default {
  all,
  upcoming: getUpcomingEvents(all),
  previous: getPreviousEvents(all)
}
