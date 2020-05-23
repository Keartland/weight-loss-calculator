import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Slider } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class WeightInput extends React.Component {
    state = {
        value:this.props.defaultValue,
    }
    styles = {
        outline: {
            padding:5,
            borderWidth:1,
            borderRadius:5,
            alignItems: "center",
            borderColor: this.props.style.color,
            marginRight:5,
        },
        mainNumber: {
            fontSize: 25,
            color: this.props.style.color,
            marginLeft:5,
            marginRight:5,
        },
    }

    updateValue (newValue){
        this.setState({value:Number(newValue)})
        this.props.onChange(newValue)
    }

    render(){
        return (
            <View style={{ flexDirection:"row"}}>
                <View style={this.styles.outline}>
                    <TextInput
                        style={this.styles.mainNumber}
                        onChangeText={text => this.updateValue(text)}
                        defaultValue={this.state.value.toString()}
                        keyboardType={"numeric"}
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.updateValue(this.state.value + 1)}>
                        <FontAwesome name="plus-circle" size={24} color={this.props.style.color} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.updateValue(this.state.value - 1)}>
                        <FontAwesome name="minus-circle" size={24} color={this.props.style.color} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
class App extends React.Component {
    state = {
        calsConsumed:3000,
        LastWeight:200,
        BodyWeight:199,
        percentLoss: 1,
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={{ padding: 50 }}>
                    <Text style={styles.output}>You should eat</Text>
                    <Text style={styles.calorieOutput}>{Math.round(this.state.calsConsumed + 500*(this.state.LastWeight-this.state.BodyWeight - (this.state.BodyWeight*this.state.percentLoss)/100))} kcals</Text>
                    <Text style={styles.output}>every day to lose {(this.state.BodyWeight*this.state.percentLoss)/100}lbs in a week</Text>
                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>Weight Last Week (lbs)</Text>
                        <WeightInput style={{color:"white"}} defaultValue={this.state.LastWeight} onChange={(weight) => this.setState({BodyWeight:weight})}></WeightInput>
                    </View>
                    <View>
                        <Text style={styles.label}>Current Weight (lbs)</Text>
                        <WeightInput style={{lesserColor:"gainsboro",color:"white"}} defaultValue={this.state.BodyWeight} onChange={(weight) => this.setState({BodyWeight:weight})}></WeightInput>
                    </View>
                </View>
                <View style={[styles.row, {justifyContent: 'center'}]}>
                    <Text style={styles.label}>I want to lose </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({percentLoss:text})}
                        defaultValue={this.state.percentLoss.toString()}
                        keyboardType={"numeric"}
                    />
                    <Text style={styles.label}>% of my weight in a week.</Text>
                </View>
                <View style={[styles.row, {justifyContent: 'center'}]}>
                    <Text style={styles.label}>I am eating </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({calsConsumed:Number(text)})}
                        defaultValue={this.state.calsConsumed.toString()}
                        keyboardType={"numeric"}
                    />
                    <Text style={styles.label}>kcal a day</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d3b66',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    row: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    label: {
        color: "white",
    },
    calorieOutput: {
        color: "#0d3b66",
        borderWidth: 5,
        borderRadius: 10,
        borderColor: "white",
        fontSize:50,
        textAlign:"center",
        backgroundColor:"white",
        elevation:10,
    },
    output: {
        color: "white",
        textAlign:"center",
        fontSize:25,
    },
    input: {
        height: 40,
        padding:10,
        color: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "white",
    },
});

export default App;
