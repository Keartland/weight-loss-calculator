import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Slider, Picker } from 'react-native';
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
            borderColor: this.props.style.color,
            marginRight:5,
            width:60,
        },
        mainNumber: {
            fontSize: 25,
            color: this.props.style.color,
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
        calsConsumed:0,
        LastWeight:0,
        BodyWeight:0,
        goalLoss: 0,
        gainLossText: "lose",
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={{ padding: 25 }}>
                    <Text style={styles.output}>You should eat</Text>
                    <Text style={styles.calorieOutput}>{Math.round(this.state.calsConsumed + 500*(this.state.LastWeight-this.state.BodyWeight - (this.state.gainLossText == "lose" ? 1:-1)*this.state.goalLoss))} kcals</Text>
                    <Text style={styles.output}>every day to {this.state.gainLossText} {(this.state.goalLoss)}lbs in a week</Text>
                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>Weight Last Week (lbs)</Text>
                        <WeightInput style={{color:"white"}} defaultValue={this.state.LastWeight} onChange={(weight) => this.setState({LastWeight:weight})}></WeightInput>
                    </View>
                    <View>
                        <Text style={styles.label}>Current Weight (lbs)</Text>
                        <WeightInput style={{lesserColor:"gainsboro",color:"white"}} defaultValue={this.state.BodyWeight} onChange={(weight) => this.setState({BodyWeight:weight})}></WeightInput>
                    </View>
                </View>
                <View style={[styles.row, {justifyContent: 'center'}]}>
                    <Text style={styles.label}>I want to</Text>
                    <Picker
                        selectedValue={this.state.gainLossText}
                        style={[styles.label,{width: 95}]}
                        onValueChange={(itemValue, itemIndex) => this.setState({ gainLossText: itemValue })}>
                        <Picker.Item label="lose" value="lose" />
                        <Picker.Item label="gain" value="gain" />
                    </Picker>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({goalLoss:Number(text)})}
                        defaultValue={this.state.goalLoss.toString()}
                        keyboardType={"numeric"}
                    />
                    <Text style={styles.label}>lbs in a week.</Text>
                </View>
                <View style={[styles.row, {justifyContent: 'center'}]}>
                    <Text style={styles.label}>I am eat </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({calsConsumed:Number(text)})}
                        defaultValue={this.state.calsConsumed.toString()}
                        keyboardType={"numeric"}
                    />
                    <Text style={styles.label}>kcals a day</Text>
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
        marginTop:10,
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
        padding:5,
        borderWidth:1,
        borderRadius:5,
        borderColor: 'white',
        color:'white',
        width:50,
    },
});

export default App;
