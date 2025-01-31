import * as core from '@actions/core'
// import { Octokit } from '@octokit/rest'
import { readFileSync } from 'node:fs'
import { execSync } from 'child_process'

const Garmin_api_url = core.getInput('GARMIN_API_URL')
// const octoit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const COMMIT_NAME = core.getInput('COMMIT_NAME')
const COMMIT_EMAIL = core.getInput('COMMIT_EMAIL')

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

async function updateReadme(garminData: GarminData): Promise<void> {
  const readmePath = 'README.md'
  const startMarker = '<!-- GARMIN-DATA:START -->'
  const endMarker = '<!-- GARMIN-DATA:END -->'

  let readmeContent = ''
  try {
    readmeContent = readFileSync(readmePath, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      core.warning('README.md not found, creating new file')
    } else {
      throw new Error(`Failed to read README.md: ${error}`)
    }
  }

  const newContent = `${garminData.last_activity.activityName} distace: ${garminData.last_activity.distance} duration: ${garminData.last_activity.duration} steps: ${garminData.last_activity.steps}`

  if (readmeContent) {
    const startIndex = readmeContent.indexOf(startMarker)
    const endIndex = readmeContent.indexOf(endMarker) + endMarker.length

    if (startIndex === -1 || endIndex === -1) {
      core.info('Markers not found, appending content to README')
      readmeContent = `${readmeContent}\n\n${newContent}`
    } else if (endIndex <= startIndex) {
      throw new Error('Invalid marker positions in README.md')
    } else {
      readmeContent =
        readmeContent.substring(0, startIndex) +
        newContent +
        readmeContent.substring(endIndex)
    }
  } else {
    readmeContent = newContent
  }
  execSync(`git config --global user.name `)
  execSync(`git config --global user.email "${COMMIT_NAME}"`)
  execSync(`git commit --allow-empty -m "${COMMIT_EMAIL}"`)
  execSync('git push')
}

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // call fetch to get the data from an api
    const response = await fetch(Garmin_api_url)

    // check if the response is ok add the data to readme.md
    if (response.ok) {
      const data: GarminData = await response.json()
      await updateReadme(data)
      core.info(`Data: ${data}`)
    } else {
      core.warning(`Failed to fetch data from ${Garmin_api_url}`)
    }

    // Set outputs for other workflow steps to use
    // core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
