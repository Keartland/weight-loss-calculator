import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

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
                <View>
                    <Text style={styles.label}>Current Weight (lbs)</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({BodyWeight:text})}
                        defaultValue={this.state.BodyWeight.toString()}
                        keyboardType={"numeric"}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Weight Last Week (lbs)</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({LastWeight:text})}
                        defaultValue={this.state.LastWeight.toString()}
                        keyboardType={"numeric"}
                    />
                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>% of weight to lose</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.setState({percentLoss:text})}
                            defaultValue={this.state.percentLoss.toString()}
                            keyboardType={"numeric"}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>kcal/day</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.setState({calsConsumed:text})}
                            defaultValue={this.state.calsConsumed.toString()}
                            keyboardType={"numeric"}
                        />
                    </View>
                </View>
                <Text></Text>
                <Text style={styles.output}>You need to eat {500*(this.state.LastWeight-this.state.BodyWeight - (this.state.LastWeight*this.state.percentLoss)/100)} more calories daily</Text>
                <Text style={styles.output}>You need to eat {this.state.calsConsumed + 500*(this.state.LastWeight-this.state.BodyWeight - (this.state.LastWeight*this.state.percentLoss)/100)} calories daily to lose {(this.state.LastWeight*this.state.percentLoss)/100}lbs in a week</Text>


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
        padding: 50,
    },
    row: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    label: {
        color: "white",
    },
    output: {
        color: "white",
    },
    input: {
        height: 40,
        padding:10,
        borderColor: "white",
        color: "white",
        borderWidth: 1,
        borderRadius: 10,
    },
});

export default App;
