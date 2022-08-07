export type ColorAndTooltip = readonly { color: string; tooltip: string }[];

export const typeColors: ColorAndTooltip = Object.freeze([
    {
      color: 'blue',
      tooltip: 'The player abandoned the BG (deserter)'
    },
    {
      color: 'grey',
      tooltip:
        'The player is kicked out from the BG after being offline (deserter or player crashed)'
    },
    {
      color: 'red',
      tooltip:
        'The player is invited to join BG but he refused, he clicked Leave Queue (queue abuser)'
    },
    {
      color: 'orange',
      tooltip:
        "The player is invited to join BG but he doesn't click on any button and the time expires (AFK or queue abuser)"
    },
    {
      color: 'yellow',
      tooltip:
        'The player is invited to join BG but in that time he logs out (queue abuser or the player just logged out)'
    }
  ]);