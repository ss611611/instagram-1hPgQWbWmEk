import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_LIKES_STATE_CHANGE, CLEAR_DATA } from "../constants/index"
import firebase from "firebase";
require('firebase/firestore')

export function clearData() {
    return ((dispacth) => {
        dispacth({type: CLEAR_DATA})
    })
}
export function fetchUserPosts(){
    return ((dispacth) => {
        firebase.firestore()
        .collection("user")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                dispacth({type : USER_STATE_CHANGE,currentUser: snapshot.data() })
            }
            else{
                console.log('dose not exist')
            }
        })
    })
}

export function fetchUserPosts(){
    return ((dispacth) => {
        firebase.firestore()
        .collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {    
            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })   
                console.log(snapshot.docs)
                dispacth({type : USER_POSTS_STATE_CHANGE,currentUser: snapshot.data()})
            
        })
    })
}

export function fetchUserFollowing(){
    return ((dispacth) => {
        firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .onSnapshot((snapshot) => {    
            let following = snapshot.docs.map(doc => {
                const id = doc.id;
                return  id
            }) 
                dispacth({type : USER_FOLLOWING_STATE_CHANGE, following });
                for(let i = 0; i < following.length; i++){
                    dispacth(fetchUserData(following[i]));
                }
            
        })
    })
}


export function fetchUserData(uid, getPosts){
    return((dispacth, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);

        if(!found){
            firebase.firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                let user = snapshot.data();
                user.uid = snapshot.id;

                dispacth({type : USERS_DATA_STATE_CHANGE,user });
                dispacth(fetchUsersFollowingPosts(user.id));
            }
            else{
                console.log('dose not exist')
            }
        })
        if(getPosts){
            dispacth(fetchUsersFollowingPosts(uid));
        }
        }
    })
}

export function fetchUsersFollowingPosts(uid){
    return ((dispacth, getState) => {
        firebase.firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {    
            const uid = snapshot.query.EP.path.segments[1];
            const user = getState().usersState.users.find(el => el.uid === uid);

            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data, user }
            })
            for(let i = 0; i< posts.length; i++){
                dispacth(fetchUsersFollowingLikes(uid, posts[i].id))
            }
            dispacth({type : USERS_POSTS_STATE_CHANGE, posts, uid})
            
        })
    })
}

export function fetchUsersFollowingLikes(uid, postId){
    return ((dispacth, getState) => {
        firebase.firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .doc(postId)
        .collection("likes")
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot) => {    
            const postId = snapshot.ZE.path.segments[3];

            let currentUserLike = false;
            if(snapshot.exists){
                currentUserLike = true; 
            }
            
                dispacth({type : USERS_LIKES_STATE_CHANGE, postId, currentUserLike})
            
        })
    })
}