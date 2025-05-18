export enum Planet {
    Jupiter = 'JUP',
    Mars = 'MRS',
    Mercury = 'MER',
    Neptune = 'NEP',
    Saturn='SAT',
    Earth = 'TRR',
    Uranus = 'URN',
    Venus = 'VNS'
}

export const PlanetanetNames: Record<Planet, string> = {
    [Planet.Jupiter]: 'Jupiter',
    [Planet.Mars]: 'Mars',
    [Planet.Mercury]: 'Mercury',
    [Planet.Saturn]: 'Saturn',
    [Planet.Neptune]: 'Neptune',
    [Planet.Earth]: 'Earth',
    [Planet.Uranus]: 'Uranus',
    [Planet.Venus]: 'Venus'
};
