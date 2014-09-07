module.exports = require('../api/city-by-location.api.js')
    .setAction(function () {
        return {
            Point: {
                pos: '37.619899 55.753676'
            },
            boundedBy: {
                Envelope: {
                    lowerCorner: '37.298509 55.490631',
                    upperCorner: '37.967682 55.957565'
                }
            },
            description: 'Russian Federation',
            metaDataProperty: {
                GeocoderMetaData: {
                    AddressDetails: {
                        Country: {
                            AddressLine: 'Moscow',
                            AdministrativeArea: {
                                AdministrativeAreaName: 'Tsentralny federalny okrug',
                                SubAdministrativeArea: {
                                    Locality: {
                                        LocalityName: 'Moscow'
                                    },
                                    SubAdministrativeAreaName: 'Moscow'
                                }
                            },
                            CountryName: 'Russian Federation',
                            CountryNameCode: 'RU'
                        }
                    },
                    kind: 'locality',
                    precision: 'other',
                    text: 'Russian Federation, Moscow'
                }
            },
            name: 'Moscow'
        };
    });
