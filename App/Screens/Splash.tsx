import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';

interface IState{
    isAnimating: boolean
}

class SplashScreen extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            isAnimating: true
        }
    }
    componentDidMount() {
        setTimeout(()=>{
            this.setState({isAnimating:false});
            this.props.navigation.navigate('LogInScreen');
        }, 4000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' style={styles.ImageStyle} source={require('../Assets/github_logo.png')} />
                <Progress.Bar
                    animated={true}
                    color='grey'
                    borderColor='grey'
                    progress={1}
                    width={200}
                    indeterminate={this.state.isAnimating}
                    indeterminateAnimationDuration={4000}
                    animationType='timing'
                    height={15} />
            </View>
        )
    }
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageStyle: {
        width: 200,
        height: 200,
        marginBottom:50,
    },
    loadingGIF: {
        width: 100,
        height: 100,
        marginTop: 80
    }
});
