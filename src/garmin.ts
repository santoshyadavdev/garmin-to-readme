// interface ActivityType {
//   typeId: number;
//   typeKey: string;
//   parentTypeId: number;
//   isHidden: boolean;
//   trimmable: boolean;
//   restricted: boolean;
// }

// interface EventType {
//   typeId: number;
//   typeKey: string;
//   sortOrder: number;
// }

// interface Privacy {
//   typeId: number;
//   typeKey: string;
// }

// interface SummarizedDiveInfo {
//   summarizedDiveGases: any[];
// }

interface LastActivity {
  activityId: number
  activityName: string
  startTimeLocal: string
  startTimeGMT: string
  //   activityType: ActivityType;
  //   eventType: EventType;
  distance: number
  duration: number
  elapsedDuration: number
  movingDuration: number
  elevationGain: number
  elevationLoss: number
  averageSpeed: number
  maxSpeed: number
  startLatitude: number
  startLongitude: number
  hasPolyline: boolean
  hasImages: boolean
  ownerId: number
  ownerDisplayName: string
  ownerFullName: string
  ownerProfileImageUrlSmall: string
  ownerProfileImageUrlMedium: string
  ownerProfileImageUrlLarge: string
  calories: number
  bmrCalories: number
  averageHR: number
  maxHR: number
  averageRunningCadenceInStepsPerMinute: number
  maxRunningCadenceInStepsPerMinute: number
  steps: number
  userRoles: string[]
  //   privacy: Privacy;
  userPro: boolean
  hasVideo: boolean
  timeZoneId: number
  beginTimestamp: number
  sportTypeId: number
  avgStrideLength: number
  deviceId: number
  minElevation: number
  maxElevation: number
  maxDoubleCadence: number
  maxVerticalSpeed: number
  manufacturer: string
  locationName: string
  lapCount: number
  endLatitude: number
  endLongitude: number
  waterEstimated: number
  trainingEffectLabel: string
  minActivityLapDuration: number
  aerobicTrainingEffectMessage: string
  anaerobicTrainingEffectMessage: string
  splitSummaries: any[]
  hasSplits: boolean
  moderateIntensityMinutes: number
  vigorousIntensityMinutes: number
  differenceBodyBattery: number
  hasHeatMap: boolean
  hrTimeInZone_0: number
  hrTimeInZone_1: number
  hrTimeInZone_2: number
  hrTimeInZone_3: number
  hrTimeInZone_4: number
  hrTimeInZone_5: number
  purposeful: boolean
  manualActivity: boolean
  pr: boolean
  autoCalcCalories: boolean
  elevationCorrected: boolean
  atpActivity: boolean
  favorite: boolean
  decoDive: boolean
  parent: boolean
}

interface GarminData {
  last_activity: LastActivity
}
