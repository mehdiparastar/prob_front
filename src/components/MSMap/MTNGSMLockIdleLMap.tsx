import InfoIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, ButtonGroup, Chip, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import maplibregl, { NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import { IGSMLockIdle, useGetDTCurrentGSMLockIdle_MTNQuery } from '../../redux/features/probSocketApiSlice';
import { BlackDot } from '../BlackDot/BlackDot';
import { GreenDot } from '../GreenDot/GreenDot';
import { RedDot } from '../RedDot/RedDot';
import { YellowDot } from '../YellowDot/YellowDot';

const GMapTypeId = {
    HYBRID: 'hybrid',
    ROADMAP: 'roadmap',
    SATELLITE: 'satellite',
    TERRAIN: 'terrain'
};

// const API_KEY = 'T6S7ktDK2YMvCYjjVIPn'

const enum MapType {
    HYBRID = `https://api.maptiler.com/maps/hybrid/style.json?key=T6S7ktDK2YMvCYjjVIPn`,
    STREET = `https://api.maptiler.com/maps/streets-v2/style.json?key=T6S7ktDK2YMvCYjjVIPn`,
    OFFLINE = `http://192.168.0.176:8080/styles/basic-preview/style.json`,
    GOOGLE = "GOOGLE"
};

const enum DotColorsEnum {
    green = 'GREEN',
    yellow = 'YELLOW',
    red = 'RED',
    black = 'BLACK',
}

interface MTNGSMLockIdleLMapProps { }

const MTNGSMLockIdleLMap: React.FC<MTNGSMLockIdleLMapProps> = () => {
    const [mapStyle, setMapStyle] = useState<MapType>(MapType.STREET)


    return (
        <Stack direction={'column'} width={1} height={1} spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ButtonGroup size='small' variant="contained" aria-label="Map_Type_Control">
                    <Button color={mapStyle === MapType.HYBRID ? 'primary' : 'secondary'} onClick={() => setMapStyle(MapType.HYBRID)}>Hybrid</Button>
                    <Button color={mapStyle === MapType.STREET ? 'primary' : 'secondary'} onClick={() => setMapStyle(MapType.STREET)}>Street</Button>
                    <Button color={mapStyle === MapType.OFFLINE ? 'primary' : 'secondary'} onClick={() => setMapStyle(MapType.OFFLINE)}>Offline</Button>
                    <Button color={mapStyle === MapType.GOOGLE ? 'primary' : 'secondary'} onClick={() => setMapStyle(MapType.GOOGLE)}>Google</Button>
                </ButtonGroup>
                <Chip label={<Typography variant='caption'>2G Lock IDLE <small>MTN</small></Typography>} color="info" />
            </Box>
            {
                mapStyle !== MapType.GOOGLE ?
                    <MapLibre key={mapStyle} mapStyle={mapStyle} />
                    :
                    <GMap key={"key"} />
            }
        </Stack>
    );
}


interface GMapProps { }

const GMap: React.FC<GMapProps> = () => {
    const { data: gsmIdleLockData_MTN = [] } = useGetDTCurrentGSMLockIdle_MTNQuery()
    const [showTable, setShowTable] = useState<boolean>(false);
    const theme = useTheme();

    const lastLat = +(gsmIdleLockData_MTN.slice(-1)[0]?.latitude)
    const lastLng = +(gsmIdleLockData_MTN.slice(-1)[0]?.longitude)
    const lastAlt = +(gsmIdleLockData_MTN.slice(-1)[0]?.altitude)

    const lastRxLev = +(gsmIdleLockData_MTN.slice(-1)[0]?.gsmIdleSamplesMTN[0]?.rxlev) || +(gsmIdleLockData_MTN.slice(-2)[0]?.gsmIdleSamplesMTN[0]?.rxlev)

    return (
        <Stack direction={'column'}>
            <Box sx={{ position: 'relative', display: 'inline-block', p: 0, m: 0, width: 1, height: 1 }}>
                {
                    gsmIdleLockData_MTN &&
                    <APIProvider apiKey={"AIzaSyBTAu6wiVZVn6sajQl-DM2TkY0oKon2MLk"} >
                        <Map
                            mapId={'bf51a910020fa25a_gsmIdleLockData_MTN'}
                            style={{ borderRadius: "4px", minHeight: "400px" }}
                            defaultCenter={{ lat: (gsmIdleLockData_MTN && gsmIdleLockData_MTN.slice(-1)[0] && +gsmIdleLockData_MTN.slice(-1)[0].latitude) || 38.026946, lng: (gsmIdleLockData_MTN && gsmIdleLockData_MTN.slice(-1)[0] && +gsmIdleLockData_MTN.slice(-1)[0].longitude) || 46.369456 }}
                            defaultZoom={15}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                            mapTypeId={GMapTypeId.SATELLITE}
                        >
                            {
                                gsmIdleLockData_MTN?.map((point, index) =>
                                    <AdvancedMarker
                                        key={index}
                                        position={{ lat: +point.latitude, lng: +point.longitude }}
                                        title={'AdvancedMarker with custom html content.'}
                                    >
                                        {getRxLevColoredDot(point.gsmIdleSamplesMTN && point.gsmIdleSamplesMTN[0] && +point.gsmIdleSamplesMTN[0].rxlev)}
                                    </AdvancedMarker>
                                )
                            }
                        </Map>
                    </APIProvider>
                }
                <Box sx={{ zIndex: 1, position: 'absolute', bottom: theme.spacing(1), left: theme.spacing(1), maxWidth: "100%", textAlign: 'left' }}>
                    <IconButton size='small' sx={{ bgcolor: theme.palette.common.white, mb: 0.5, p: 0, left: 0, ":hover": { bgcolor: theme.palette.common.white } }} onClick={() => setShowTable(!showTable)}>
                        <InfoIcon color={"info"} />
                    </IconButton>
                    {showTable && <TableGuide />}
                </Box>
            </Box>
            {
                gsmIdleLockData_MTN.length > 0 ?
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1 }}>
                        <Typography variant='caption'>
                            {lastLat.toFixed(4)}, {lastLng.toFixed(4)}, {lastAlt.toFixed(0)}
                        </Typography>
                        <Typography variant='caption'>
                            RxLev: {lastRxLev} | samples: {gsmIdleLockData_MTN.length}
                        </Typography>
                    </Box> :
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1 }}>
                        <Typography variant='caption'>
                            -, -, -
                        </Typography>
                        <Typography variant='caption'>
                            RxLev: - | samples: {gsmIdleLockData_MTN.length}
                        </Typography>
                    </Box>
            }
        </Stack>
    );
}

interface MapLibreProps {
    mapStyle: MapType,
}

const MapLibre: React.FC<MapLibreProps> = ({ mapStyle }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const theme = useTheme();
    const { data: gsmIdleLockData_MTN = [] } = useGetDTCurrentGSMLockIdle_MTNQuery()
    const [showTable, setShowTable] = useState<boolean>(false);

    const lastLat = +(gsmIdleLockData_MTN.slice(-1)[0]?.latitude)
    const lastLng = +(gsmIdleLockData_MTN.slice(-1)[0]?.longitude)
    const lastAlt = +(gsmIdleLockData_MTN.slice(-1)[0]?.altitude)

    const lastRxLev = +(gsmIdleLockData_MTN.slice(-1)[0]?.gsmIdleSamplesMTN[0]?.rxlev) || +(gsmIdleLockData_MTN.slice(-2)[0]?.gsmIdleSamplesMTN[0]?.rxlev)

    const getGeojsonFeatures = (gsmIdleLockData: IGSMLockIdle[]): GeoJSON.Feature[] => {
        return gsmIdleLockData.map(p => (
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [+p.longitude, +p.latitude] // [46.324562, 38.068597]
                },
                properties: {
                    color: getRxLevColor((p.gsmIdleSamplesMTN && p.gsmIdleSamplesMTN.length > 0) ? +p.gsmIdleSamplesMTN[0]?.rxlev : 0),
                    value: (p.gsmIdleSamplesMTN && p.gsmIdleSamplesMTN.length > 0) ? +p.gsmIdleSamplesMTN[0]?.rxlev : 0,
                    description: `<div style=color:black;><strong>RxLev</strong>: ${(p.gsmIdleSamplesMTN && p.gsmIdleSamplesMTN.length > 0) ? +p.gsmIdleSamplesMTN[0]?.rxlev : 0} dbm</div>`
                }
            }
        ))
            ||
            []
    }

    const addLayersAndSources = () => {
        if (map.current) {
            const nav = new NavigationControl({
                visualizePitch: true
            });
            map.current.addControl(nav, "top-left");
            map.current.addControl(new maplibregl.FullscreenControl());

            // Define the GeoJSON source
            const geojson: GeoJSON.FeatureCollection = {
                type: 'FeatureCollection',
                features: getGeojsonFeatures(gsmIdleLockData_MTN)
            };

            // Add the GeoJSON source to the map
            map.current.addSource('point', {
                type: 'geojson',
                data: geojson
            });

            // Add a layer to display the point
            map.current.addLayer({
                id: 'points',
                type: 'circle',
                source: 'point',
                paint: {
                    'circle-radius': 10,
                    'circle-color': ['get', 'color'], // Use the color property from the features
                    'circle-opacity': 1,
                }
            });

            map.current.addLayer({
                'id': 'point-labels',
                'type': 'symbol',
                'source': 'point',
                'layout': {
                    'text-field': [
                        // 'concat',
                        // ['get', 'kpi'],
                        // ': ',
                        // ['to-string', ['get', 'value']],                        
                        'to-string', ['get', 'value'],
                    ],
                    'text-font': [
                        'Noto Sans Regular',
                        // 'Open Sans Bold',
                        // 'Arial Unicode MS Bold'
                    ],
                    'text-size': 10
                },
                'paint': {
                    'text-color': theme.palette.text.primary
                }
            });


            map.current.on('click', 'points', (e: any) => {
                if (!map.current) return

                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new maplibregl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map.current);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.current.on('mouseenter', 'points', () => {
                if (!map.current) return
                map.current.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.current.on('mouseleave', 'points', () => {
                if (!map.current) return
                map.current.getCanvas().style.cursor = '';
            });

            const lng = gsmIdleLockData_MTN.slice(-1)[0] && +gsmIdleLockData_MTN.slice(-1)[0].longitude
            const lat = gsmIdleLockData_MTN.slice(-1)[0] && +gsmIdleLockData_MTN.slice(-1)[0].latitude
            if (lng && lat) {
                map.current.panTo([lng, lat])
            }
        }
    };

    useEffect(() => {
        if (map.current) return; // stops map from initializing more than once                

        if (maplibregl.getRTLTextPluginStatus() !== 'loaded') {
            maplibregl.setRTLTextPlugin(
                '/mapbox-gl-rtl-text.min.js',
                true  // lazy load the plugin
            );
        }

        map.current = new maplibregl.Map({
            container: mapContainer.current!,
            style: mapStyle,
            center: { lat: 38.068597, lng: 46.324562 },
            zoom: 14,
            // maxZoom: 14,
            attributionControl: {
                compact: true,
            },
        });

        map.current.on('style.load', addLayersAndSources);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (map.current) {
            const geojson: GeoJSON.FeatureCollection = {
                type: 'FeatureCollection',
                features: getGeojsonFeatures(gsmIdleLockData_MTN)
            };

            const src = map.current.getSource('point') as any
            if (src && gsmIdleLockData_MTN.length > 0) {
                src.setData(geojson)
                const lng = +gsmIdleLockData_MTN.slice(-1)[0].longitude
                const lat = +gsmIdleLockData_MTN.slice(-1)[0].latitude
                if (lat && lng)
                    map.current.panTo([+gsmIdleLockData_MTN.slice(-1)[0].longitude, +gsmIdleLockData_MTN.slice(-1)[0].latitude])
            }
        }
        // eslint-disable-next-line
    }, [gsmIdleLockData_MTN])

    const getRxLevColor = (rxLev: number | string) => {
        const colorEnum = getRxLevColorEnum(rxLev)

        switch (colorEnum) {
            case DotColorsEnum.green:
                return theme.palette.success.main

            case DotColorsEnum.yellow:
                return theme.palette.warning.main

            case DotColorsEnum.red:
                return theme.palette.error.main

            case DotColorsEnum.black:
                return theme.palette.common.black

            default:
                return theme.palette.common.black
        }
    }

    return (
        <Stack direction={'column'}>
            <Box sx={{ position: 'relative', display: 'inline-block', p: 0, m: 0, width: 1, height: 1, minHeight: 400, maxHeight: 400 }} ref={mapContainer}>
                <Box sx={{ zIndex: 1, position: 'absolute', bottom: theme.spacing(1), left: theme.spacing(1), maxWidth: "100%", textAlign: 'left' }}>
                    <IconButton size='small' sx={{ bgcolor: theme.palette.common.white, mb: 0.5, p: 0, left: 0, ":hover": { bgcolor: theme.palette.common.white } }} onClick={() => setShowTable(!showTable)}>
                        <InfoIcon color={"info"} />
                    </IconButton>
                    {showTable && <TableGuide />}
                </Box>
            </Box>
            {
                gsmIdleLockData_MTN.length > 0 ?
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1 }}>
                        <Typography variant='caption'>
                            {lastLat.toFixed(4)}, {lastLng.toFixed(4)}, {lastAlt.toFixed(0)}
                        </Typography>
                        <Typography variant='caption'>
                            RxLev: {lastRxLev} | samples: {gsmIdleLockData_MTN.length}
                        </Typography>
                    </Box> :
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1 }}>
                        <Typography variant='caption'>
                            -, -, -
                        </Typography>
                        <Typography variant='caption'>
                            RxLev: - | samples: {gsmIdleLockData_MTN.length}
                        </Typography>
                    </Box>
            }
        </Stack>
    );
}


interface TableGuideProps { }

const TableGuide: React.FC<TableGuideProps> = () => {
    const theme = useTheme();
    const { data: gsmIdleLockData_MTN = [] } = useGetDTCurrentGSMLockIdle_MTNQuery()

    const samples = gsmIdleLockData_MTN.filter(item => item.latitude).map(sm => {
        const rxlev = sm.gsmIdleSamplesMTN && sm.gsmIdleSamplesMTN[0] && sm.gsmIdleSamplesMTN[0].rxlev
        return getRxLevColorEnum(rxlev)
    })

    const greenCount = samples.filter(sm => sm === DotColorsEnum.green).length
    const yellowCount = samples.filter(sm => sm === DotColorsEnum.yellow).length
    const redCount = samples.filter(sm => sm === DotColorsEnum.red).length
    const blackCount = samples.filter(sm => sm === DotColorsEnum.black).length
    const allCount = samples.length

    let greenKM = 0
    let yellowKM = 0
    let redKM = 0
    let blackKM = 0

    for (let i = 1; i < gsmIdleLockData_MTN.filter(item => item.latitude).length; i++) {
        const sm = gsmIdleLockData_MTN[i];
        const rxlev = sm.gsmIdleSamplesMTN && sm.gsmIdleSamplesMTN[0] && sm.gsmIdleSamplesMTN[0].rxlev
        const rxlevColor = getRxLevColorEnum(rxlev)
        if (i > 0) {
            const currentLat = +sm.latitude
            const currentLng = +sm.longitude
            const prevLat = +gsmIdleLockData_MTN[i - 1].latitude
            const prevLng = +gsmIdleLockData_MTN[i - 1].longitude

            const dist = calculateDistance(prevLat, prevLng, currentLat, currentLng)
            switch (rxlevColor) {
                case DotColorsEnum.green:
                    greenKM = greenKM + dist
                    break;

                case DotColorsEnum.yellow:
                    yellowKM = yellowKM + dist
                    break;

                case DotColorsEnum.red:
                    redKM = redKM + dist
                    break;

                case DotColorsEnum.black:
                    blackKM = blackKM + dist
                    break;

                default:
                    blackKM = blackKM + dist
                    break;
            }
            if (isNaN(dist)) {
                console.log('dist is NAN')
            }
        }
    }

    const allKM = greenKM + yellowKM + redKM + blackKM

    return (
        <Paper elevation={4} sx={{ p: 0.5, bgcolor: theme.palette.common.white, textAlign: "center" }}>
            <Box component={'table'} sx={{ zIndex: 1, borderCollapse: 'collapse', fontSize: 10, border: 1, maxWidth: 120, borderRadius: '4px', color: theme.palette.common.black }} >
                <Box component={'tbody'}>
                    <Box component={'tr'} borderBottom={1}>
                        <Box component={'th'} color={theme.palette.info.main} colSpan={2}>RxLevel <small>MTN</small></Box>
                        <Box component={'th'} borderLeft={1}>SAM</Box>
                        <Box component={'th'} borderLeft={1}>%SAM</Box>
                        <Box component={'th'} borderLeft={1}>KM</Box>
                        <Box component={'th'} borderLeft={1}>%KM</Box>
                    </Box>
                    <Box component={'tr'} borderBottom={1}>
                        <Box component={'th'}>
                            <Typography noWrap variant='caption'>[-90, +∞)</Typography>
                        </Box>
                        <Box component={'th'} borderRight={1}><Box sx={{ margin: 'auto', width: 12, height: 12, background: theme.palette.success.light, border: `2px solid ${theme.palette.success.dark}`, borderRadius: '50%' }} /></Box>
                        <Box component={'td'} borderRight={1}>{greenCount}</Box>
                        <Box component={'td'} borderRight={1}>{allCount !== 0 ? (greenCount / allCount * 100).toFixed(2) : '-'}</Box>
                        <Box component={'td'} borderRight={1}>{greenKM.toFixed(2)}</Box>
                        <Box component={'td'}>{allKM >= 0.009 ? (greenKM / allKM * 100).toFixed(2) : '-'}</Box>
                    </Box>
                    <Box component={'tr'} borderBottom={1}>
                        <Box component={'th'}>
                            <Typography noWrap variant='caption'>[-93, -90)</Typography>
                        </Box>
                        <Box component={'th'} borderRight={1}><Box sx={{ margin: 'auto', width: 12, height: 12, background: theme.palette.warning.light, border: `2px solid ${theme.palette.warning.dark}`, borderRadius: '50%' }} /></Box>
                        <Box component={'td'} borderRight={1}>{yellowCount}</Box>
                        <Box component={'td'} borderRight={1}>{allCount !== 0 ? (yellowCount / allCount * 100).toFixed(2) : '-'}</Box>
                        <Box component={'td'} borderRight={1}>{yellowKM.toFixed(2)}</Box>
                        <Box component={'td'}>{allKM >= 0.009 ? (yellowKM / allKM * 100).toFixed(2) : '-'}</Box>
                    </Box>
                    <Box component={'tr'} borderBottom={1}>
                        <Box component={'th'}>
                            <Typography noWrap variant='caption'>(-∞, -93)</Typography>
                        </Box>
                        <Box component={'th'} borderRight={1}><Box sx={{ margin: 'auto', width: 12, height: 12, background: theme.palette.error.light, border: `2px solid ${theme.palette.error.dark}`, borderRadius: '50%' }} /></Box>
                        <Box component={'td'} borderRight={1}>{redCount}</Box>
                        <Box component={'td'} borderRight={1}>{allCount !== 0 ? (redCount / allCount * 100).toFixed(2) : '-'}</Box>
                        <Box component={'td'} borderRight={1}>{redKM.toFixed(2)}</Box>
                        <Box component={'td'}>{allKM >= 0.009 ? (redKM / allKM * 100).toFixed(2) : '-'}</Box>
                    </Box>
                    <Box component={'tr'} borderBottom={1}>
                        <Box component={'th'}>
                            <Typography noWrap variant='caption'>No Cov</Typography>
                        </Box>
                        <Box component={'th'} borderRight={1}><Box sx={{ margin: 'auto', width: 12, height: 12, background: theme.palette.common.black, border: `2px solid ${theme.palette.grey.A700}`, borderRadius: '50%' }} /></Box>
                        <Box component={'td'} borderRight={1}>{blackCount}</Box>
                        <Box component={'td'} borderRight={1}>{allCount !== 0 ? (blackCount / allCount * 100).toFixed(2) : '-'}</Box>
                        <Box component={'td'} borderRight={1}>{blackKM.toFixed(2)}</Box>
                        <Box component={'td'}>{allKM >= 0.009 ? (blackKM / allKM * 100).toFixed(2) : '-'}</Box>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

export const getRxLevColoredDot = (rxLev: number | string) => {
    const colorEnum = getRxLevColorEnum(rxLev)

    switch (colorEnum) {
        case DotColorsEnum.green:
            return <GreenDot />

        case DotColorsEnum.yellow:
            return <YellowDot />

        case DotColorsEnum.red:
            return <RedDot />

        case DotColorsEnum.black:
            return <BlackDot />

        default:
            return <BlackDot />
    }

};

export const getRxLevColorEnum = (rxLev: number | string) => {
    if (Number.isNaN(+rxLev) === false || (typeof (rxLev) === 'string' && rxLev.trim() !== '')) {
        if (+rxLev < -93) {
            return DotColorsEnum.red
        } else if (+rxLev >= -90) {
            return DotColorsEnum.green
        } else if (+rxLev >= -93 && +rxLev < -90) {
            return DotColorsEnum.yellow
        } else {
            return DotColorsEnum.black
        }
    }
    else {
        return DotColorsEnum.black
    }
}

export const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number => {
    // Convert latitude and longitude from degrees to radians
    const radLat1: number = (Math.PI * lat1) / 180;
    const radLon1: number = (Math.PI * lon1) / 180;
    const radLat2: number = (Math.PI * lat2) / 180;
    const radLon2: number = (Math.PI * lon2) / 180;

    // Haversine formula
    const dLon: number = radLon2 - radLon1;
    const dLat: number = radLat2 - radLat1;

    const a: number =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Earth radius in kilometers (you can use 3958.8 for miles)
    const radius: number = 6371;

    // Calculate the distance
    const distance: number = radius * c;

    return distance;
};

export default MTNGSMLockIdleLMap
