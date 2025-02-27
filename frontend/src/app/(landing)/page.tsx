import { HeroScrollDemo } from '@/components/containerscroll'
import { WobbleCardDemo } from '@/components/features'
import { ShootingStarsAndStarsBackgroundDemo } from '@/components/landingpagebackground'
import { TabsDemo } from '@/components/navtabs'
import { WorldMapDemo } from '@/components/worldmap'
import React from 'react'

function page() {
  return (
    <div>
        <ShootingStarsAndStarsBackgroundDemo></ShootingStarsAndStarsBackgroundDemo>
        <WorldMapDemo></WorldMapDemo>
        <div id='Aboutus'>
            <HeroScrollDemo><TabsDemo></TabsDemo></HeroScrollDemo>
        </div>
        <div id='features'>
            <WobbleCardDemo></WobbleCardDemo>
        </div>
    </div>
  )
}

export default page