const currencyItems = [
  { title: 'BTC', value: 'sygna:0x80000000' },
  { title: 'ETH', value: 'sygna:0x8000003c' },
  { title: 'XRP', value: 'sygna:0x80000090' },
  { title: 'USDT', value: 'sygna:0x8000003c.31' },
  { title: 'BCH', value: 'sygna:0x80000091' },
  { title: 'BSV', value: 'sygna:0x800000ec' },
  { title: 'LTC', value: 'sygna:0x80000002' },
  { title: 'ADA', value: 'sygna:0x80000717' },
  {
    title: 'LINK',
    value: 'sygna:0x8000003c.0x514910771af9ca656af840dff83e8264ecf986ca',
  },
  { title: 'BNB', value: 'sygna:0x800002ca' },
];

const defaultOriginatorInfo = {
  name: 'Alice Andrews',
  vasp_code: 'SBIEJPTK',
  address: '0x05ECAf39376088D7C8bF1aCc06018D7C8bF1aCc0601',
  phy_address: 'Bahnhofstrasse 665, 8001 Zurich, Switzerland',
  birth: '1975-05-02',
  place_of_birth: 'Japan',
  identity: '-',
  identity_num: '-',
};

const FAKE_PRIVATE_KEY =
  'bf76d2680f23f6fc28111afe0179b8704c8e203a5faa5112f8aa52721f78fe6a';

const FAKE_PUBLIC_KEY =
  '045b409c8c15fd82744ce4f7f86d65f27d605d945d4c4eee0e4e2515a3894b9d157483cc5e49c62c07b46cd59bc980445d9cf987622d66df20c6c3634f6eb05085';

const address = {
  'sygna:0x80000000': {
    beneficiary_address: '1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY',
    VAAI:
      'bitcoin:1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=BTSNKRSE',
  },
  'sygna:0x8000003c': {
    beneficiary_address: '0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c',
    VAAI:
      'ethereum:0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=BTSNKRSE',
  },
  'sygna:0x80000090': {
    beneficiary_address: 'r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV',
    VAAI:
      'XRP:r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=BTSNKRSE',
  },
  'sygna:0x8000003c.31': {
    beneficiary_address: '32TLn1WLcu8LtfvweLzYUYU6ubc2YV9eZs',
    VAAI:
      'Tether:32TLn1WLcu8LtfvweLzYUYU6ubc2YV9eZs?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=BTSNKRSE',
  },
  'sygna:0x80000091': {
    beneficiary_address: 'qqaaze7dav43jnduf5ln9hqkmw9htaechusat4vdje',
    VAAI:
      'Bitcoin Cash:qqaaze7dav43jnduf5ln9hqkmw9htaechusat4vdje?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=BTSNKRSE',
  },
  'sygna:0x800000ec': {
    beneficiary_address: '1AXipG6y5GxVZPdUtubtihLk88dmb3w62p',
    VAAI:
      'Bitcoin SV:1AXipG6y5GxVZPdUtubtihLk88dmb3w62p?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=BTSNKRSE',
  },
  'sygna:0x80000002': {
    beneficiary_address: 'M96ZXa3HEAbdFwYPsnTKSQqQ3YFooXMUa1',
    VAAI:
      'Litecoin:M96ZXa3HEAbdFwYPsnTKSQqQ3YFooXMUa1?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=BTSNKRSE',
  },
  'sygna:0x80000717': {
    beneficiary_address:
      'Ae2tdPwUPEZ2sVRVovpLEDqJcqdKabNpbsmbmghVfTxDXXfuNS7wNVk9ea6',
    VAAI:
      'Cardano:Ae2tdPwUPEZ2sVRVovpLEDqJcqdKabNpbsmbmghVfTxDXXfuNS7wNVk9ea6?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=BTSNKRSE',
  },
  'sygna:0x8000003c.0x514910771af9ca656af840dff83e8264ecf986ca': {
    beneficiary_address: '0xcf8c7198960268247ba0b432b609a96c61bd04cc',
    VAAI:
      'Chainlink:0xcf8c7198960268247ba0b432b609a96c61bd04cc?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=BTSNKRSE',
  },
  'sygna:0x800002ca': {
    beneficiary_address: 'bnb1s3f8vxaqum3pft6cefyn99px8wq6uk3jdtyarn',
    VAAI:
      'Binance Coin:bnb1s3f8vxaqum3pft6cefyn99px8wq6uk3jdtyarn?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=BTSNKRSE',
  },
};

export {
  currencyItems,
  defaultOriginatorInfo,
  FAKE_PRIVATE_KEY,
  FAKE_PUBLIC_KEY,
  address,
};
