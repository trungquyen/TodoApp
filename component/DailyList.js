import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import DailyItems from './DailyItems';

export default function DailyList({dailyData}) {
  return (
    <ScrollView>
        {
            dailyData.map((daily, index) => {
                return(
                    <DailyItems daily={daily} key={index} />
                )
            })
        }
    </ScrollView>
  )
}