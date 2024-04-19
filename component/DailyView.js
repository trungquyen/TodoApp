import { View, Text, TouchableOpacity } from 'react-native'
import DailyList from './DailyList'
import useAuth from '../hooks/useAuth';

export default function DailyView() {
    // const [dailyData, setDailyData] = useState([])
  
  //   useEffect(() => {
  //       const q = query(dailyRef, where("userId", "==", userId));
  //       let unsub = onSnapshot(q, (snapshot) => {
  //       let allDaily = snapshot.docs.map(doc=>{
  //           return doc.data();
  //       });
  //       setDailyData([...allDaily])
  //       });

  //       return unsub;
  //   },[])

  return (
    <View
        style={{
            width: '100%',
            height: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
            marginBottom: 30,
            paddingVertical: 10,
            paddingHorizontal: 20
        }}
        >
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 5
        }}>
            <Text>
                Daily Tasks
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Daily')}>
                <View style={{
                    width: 20,
                    height: 20,
                    backgroundColor: 'rgba(106, 171, 171, 1.0)',
                    justifyContent:'center',
                    alignItems: 'center',
                    borderRadius: 100
                }}>
                    <Text style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: '800',
                    height: 27
                    }}>
                    +
                    </Text>
                </View>
            </TouchableOpacity>
        </View>

        <View style={{
            width: '100%',
            backgroundColor: 'rgba(231, 244, 245, 1.0)',
            paddingBottom: 1,
            marginBottom: 0
        }} />

        <DailyList dailyData={dailyData} />

    </View>
  )
}