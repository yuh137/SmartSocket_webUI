export enum DisplayIcons {
    DANGER = 'material-symbols:warning',
    SAFE = 'material-symbols-light:bolt',
    UNCONNECTED = 'material-symbols:power-plug-off-rounded'
}

export enum DisplayIconColors {
    DANGER = 'text-white',
    SAFE = 'text-yellow-500',
    UNCONNECTED = 'text-black'
}

export enum DisplayRippleEffects {
    RED = 'pulse-red',
    YELLOW = 'pulse-yellow',
    GREEN = 'pulse-green',
}

export enum DisplayBackgrounds {
    SAFE = 'safe-background',
    DANGER = 'danger-background',
    UNCONNECTED = 'unconnected-background'
}

export enum DisplayMessage {
    SAFE = 'SAFE',
    DANGER = 'DANGER',
    UNCONNECTED = 'UNCONNECTED'
}

export default interface DisplayStyles {
    icon: DisplayIcons,
    rippleEffect: DisplayRippleEffects,
    background: DisplayBackgrounds,
    icon_color: DisplayIconColors,
    message: DisplayMessage
}