import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Tile } from "react-native-elements";


const DirectoryScreen = ({ navigation }) => {
    const campsites = useSelector((state) => state.campsites);

    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <Tile
                onPress={() => navigation.navigate("CampsiteInfo", { campsite })}
                title={campsite.name}
                caption={campsite.description}
                featured
                imageSrc={{uri:baseUrl + campsite.image}}
            />

        )
    }
    return (
        < FlatList
            data={campsites.campsitesArray}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}

        />
    )

}

export default DirectoryScreen;