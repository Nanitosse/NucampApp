import RenderCampsite from '../features/campsites/RenderCampsite';
import { FlatList, Text, View, StyleSheet, Button, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Rating, Input, } from 'react-native-elements';
import { postComment } from '../features/comments/commentsSlice';



// const handleSubmit = () => {

//     const  newComment={
//         author,
//         rating,
//         text,
//         campsiteId: campsite.id

//     }
//     console.log(newComment);
//     setShowModal(!showModal);
// }


// const renderCommentItem = ({ item }) => {
//     return (
//         <View style={StyleSheet.commentItem}>
//             <Text style={{ fontSize: 14 }}>{item.text}</Text>
//             {/* <Text style={{ fontSize: 12 }}>{item.rating} stars</Text> */}
//             <Rating
//                 startingValue={item.rating}
//                 imageSize={10}
//                 style={{ alignItem: 'flex-start', paddingVertical: '5%' }}
//                 readonly

//             />
//             <Text style={{ fontSize: 12 }}>
//                 {`--${item.author}, ${item.date}`}
//             </Text>
//         </View>
//     )
// }

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = () => {

        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id

        }
        // console.log(newComment);
        dispatch(postComment(newComment))
        setShowModal(!showModal);


    }
    const resetForm = () => {
        setText('');
        setAuthor('');
        setRating(5)
    };


const renderCommentItem = ({ item }) => {
    return (
        <View style={StyleSheet.commentItem}>
            <Text style={{ fontSize: 14 }}>{item.text}</Text>
            {/* <Text style={{ fontSize: 12 }}>{item.rating} stars</Text> */}
            <Rating
                startingValue={item.rating}
                imageSize={10}
                style={{ alignItem: 'flex-start', paddingVertical: '5%' }}
                readonly

            />
            <Text style={{ fontSize: 12 }}>
                {`--${item.author}, ${item.date}`}
            </Text>
        </View>
    )
}

    return (
        <>
            <FlatList
                data={comments.commentsArray.filter((comment) => comment.campsiteId === campsite.id)}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    paddingVertical: 20
                }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite
                            campsite={campsite}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                            onShowModal={() => setShowModal(!showModal)}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }

            />
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}

            >
                <View style={styles.modal}>
                    <Rating
                        startingValue={rating}
                        showRating
                        imageSize={40}
                        onFinishRating={(rating) => setRating(rating)}
                        style={{ paddingVertical: 10 }}

                    />
                    <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        value={author}
                        onChangeText={(author) => setAuthor(author)}
                    />
                    <Input
                        placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(text) => setText(text)}
                        value={text}
                    />
                    <View style={{ margin: 10 }}>
                        <Button
                            title='Submit'
                            color='#5637DD'
                            onPress={() => {
                                handleSubmit();
                                resetForm()


                            }}
                        />

                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                                setShowModal(!showModal);
                                resetForm();
                            }}
                            color='#808080'
                            title='Cancel'

                        />
                    </View>
                </View>

            </Modal>
        </>



    )
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    }
});


export default CampsiteInfoScreen




