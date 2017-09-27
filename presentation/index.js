// Import React
import React from "react";
import PropTypes from "prop-types";

// Import Spectacle Core tags
import {
  Appear,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  ListItem,
  List,
  Slide,
  Table,
  TableRow,
  TableHeaderItem,
  TableItem,
  Text
} from "spectacle";

import CodeSlide from 'spectacle-code-slide';

import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter } from 'victory';

import MathJax from 'react-mathjax';

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  gradientDescentAnimation: require("../assets/gradient-descent-animation.gif"),
  linearRegressionGradientDescentAnimation: require("../assets/linear-regression-gradient-descent-animation.gif"),
  volcano: require("../assets/volcano.jpg"),
  demo: require("../assets/demo.gif")
};

preloader(images);

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE",
  solarized: "#0E2A34"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

const housingData = [
  [2104, 5, 1, 45, 460],
  [1416, 3, 2, 40, 232],
  [1534, 3, 2, 30, 315],
  [852, 2, 1, 36, 178]
];

const simpleData = [
  [0, 1],
  [1, 2],
  [3, 3],
  [2, 4],
  [0, 0]
];

function pairsFromIndex(index, data) {
  return data.map(d => ({ x: d[index], y: d[d.length - 1] }));
}

const CrosshairsScatterPlot = ({ domain, range, data, children }) => (
  <VictoryChart>
    <VictoryAxis crossAxis
      domain={domain}
      standalone={false}
    />
    <VictoryAxis dependentAxis
      domain={range}
      standalone={false}
    />
    <VictoryScatter
      size={7}
      data={data}
    />
    {children}
  </VictoryChart>
);

CrosshairsScatterPlot.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  data: PropTypes.arrayOf(PropTypes.object),
  domain: PropTypes.arrayOf(PropTypes.number),
  range: PropTypes.arrayOf(PropTypes.number)
};

export default class Presentation extends React.Component {
  render() {
    return (
      <MathJax.Context>
        <Deck transition={["fade"]} transitionDuration={500} theme={theme}>
          <Slide bgColor="primary">
            <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Gradient Descent
            </Heading>
            <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
              if you suck at math
            </Text>
          </Slide>
          <Slide bgColor="tertiary">
            <Heading size={6} textColor="primary" caps>Disclaimer</Heading>
            <Text size={6} textColor="secondary">Maybe I got something wrong</Text>
          </Slide>
          <Slide bgColor="primary">
            <Image src={images.gradientDescentAnimation.replace("/", "")} />
          </Slide>
          <Slide bgColor="primary">
            <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Linear Regression
            </Heading>
            <Appear>
              <Image src={images.linearRegressionGradientDescentAnimation.replace("/", "")} width={"100%"} />
            </Appear>
          </Slide>
          <Slide bgColor="secondary">
            <Heading size={6} textColor="primary" caps>Linear</Heading>
            <List textColor="primary">
              <Appear>
                <ListItem>Straight line</ListItem>
              </Appear>
              <Appear>
                <ListItem>Constant gradient</ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <MathJax.Node inline>{`y = mx + c`}</MathJax.Node>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <MathJax.Node inline>{`y = c + mx`}</MathJax.Node>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <MathJax.Node inline>{`y = w_0 + w_1x`}</MathJax.Node>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Text textColor="primary">Solve for <MathJax.Node inline>{`w_0`}</MathJax.Node> and <MathJax.Node inline>{`w_1`}</MathJax.Node></Text>
                </ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide>
            <Heading size={5} textColor="tertiary" caps>With 2 data points</Heading>
            <Heading size={6} textColor="secondary">this is very easy</Heading>
            <Appear>
              <Table textColor="secondary" margin={"0 auto"} width={"50%"}>
                <TableRow>
                  <TableHeaderItem>
                    <MathJax.Node inline>{`x`}</MathJax.Node>
                  </TableHeaderItem>
                  <TableHeaderItem>
                    <MathJax.Node inline>{`y`}</MathJax.Node>
                  </TableHeaderItem>
                </TableRow>
                <TableRow>
                  <TableItem>0</TableItem>
                  <TableItem>1</TableItem>
                </TableRow>
                <TableRow>
                  <TableItem>1</TableItem>
                  <TableItem>2</TableItem>
                </TableRow>
              </Table>
            </Appear>
            <List textColor="secondary">
              <Appear>
                <ListItem>
                  <Text textColor="secondary">Solve for <MathJax.Node inline>{`w_0`}</MathJax.Node> and <MathJax.Node inline>{`w_1`}</MathJax.Node> in <MathJax.Node inline>{`y = w_0 + w_1x`}</MathJax.Node></Text>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Text textColor="secondary"><MathJax.Node inline>{`1 = w_0 + w_1 0`}</MathJax.Node> and <MathJax.Node inline>{`2 = w_0 + w_1 1`}</MathJax.Node></Text>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Text textColor="secondary">
                    <MathJax.Node inline>{`w_0 = 1 - w_1 0`}</MathJax.Node>{' and '}<MathJax.Node inline>{'w_1 = \\frac{2 - w_0}{1}'}</MathJax.Node>
                  </Text>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Text textColor="secondary">
                    <MathJax.Node inline>{'w_1 = 2 - w_1'}</MathJax.Node>
                  </Text>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Text textColor="secondary">
                    <MathJax.Node inline>{'-2 = -2w_1'}</MathJax.Node>
                  </Text>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Text textColor="secondary">
                    <MathJax.Node inline>{'w_0 = -2w_1'}</MathJax.Node>
                  </Text>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <Text textColor="secondary">
                    <MathJax.Node inline>{'w_1 = 1'}</MathJax.Node>
                  </Text>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <MathJax.Node inline>{`w_0 = 1 - 1(0)`}</MathJax.Node>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  <MathJax.Node inline>{`w_0 = 1`}</MathJax.Node>
                </ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgColor="primary">
            <VictoryChart>
              <VictoryAxis crossAxis
                domain={[-5, 5]}
                standalone={false}
              />
              <VictoryAxis dependentAxis
                domain={[-5, 5]}
                standalone={false}
              />
              <VictoryScatter
                data={[
                  { x: 0, y: 1 },
                  { x: 1, y: 2 }
                ]}
              />
              <VictoryLine
                data={[
                  { x: -5, y: -4 },
                  { x: 5, y: 6 }
                ]}
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc"}
                }}
              />
            </VictoryChart>
            <Heading size={5} fit lineHeight={1} textColor="secondary">
              <MathJax.Node inline>{`y = (1) + (1)x`}</MathJax.Node>
            </Heading>
          </Slide>
          <Slide>
            <Heading size={5} textColor="tertiary" caps>Multiple data points</Heading>
            <Appear>
              <Table textColor="secondary" margin={"0 auto"} width={"50%"}>
                <TableRow>
                  <TableHeaderItem>
                    <MathJax.Node inline>{`x`}</MathJax.Node>
                  </TableHeaderItem>
                  <TableHeaderItem>
                    <MathJax.Node inline>{`y`}</MathJax.Node>
                  </TableHeaderItem>
                </TableRow>
                {simpleData.map((row, index) => (
                  <TableRow key={index}>
                    {row.map((col, cind) => <TableItem key={cind}>{col}</TableItem>)}
                  </TableRow>
                ))}
              </Table>
            </Appear>
          </Slide>
          <Slide bgColor="primary">
            <CrosshairsScatterPlot
              domain={[-5, 5]}
              range={[-5, 5]}
              data={pairsFromIndex(0, simpleData)}
            />
            <Appear>
              <Heading size={5} fit lineHeight={1} textColor="secondary">
                Not colinear!
              </Heading>
            </Appear>
            <Appear>
              <Heading size={5} fit lineHeight={1} textColor="tertiary" upper>
                But we can try and fit a line
              </Heading>
            </Appear>
          </Slide>
          <Slide bgColor="primary">
            <CrosshairsScatterPlot
              domain={[-5, 5]}
              range={[-5, 5]}
              data={pairsFromIndex(0, simpleData)}
            />
            <Text textColor="secondary">
              <MathJax.Node inline>{`y = w_0x_0 + w_1x`}</MathJax.Node>
            </Text>
            <Text textColor="secondary" textSize={20}>
              By "convention" we inserted <MathJax.Node inline>{`x_0`}</MathJax.Node>, just pretend that it is 1 :)
            </Text>
            <Text textColor="secondary">
              <MathJax.Node inline>{`w_0 = ?`}</MathJax.Node>
            </Text>
            <Text textColor="secondary">
              <MathJax.Node inline>{`w_1 = ?`}</MathJax.Node>
            </Text>
            <Appear>
              <Heading size={5} fit lineHeight={1} textColor="tertiary" upper>
                No solution can be found by analysis
              </Heading>
            </Appear>
          </Slide>
          <Slide bgColor="primary">
            <Heading size={5} lineHeight={1} textColor="tertiary" caps>
              Lets try something else
            </Heading>
            <CrosshairsScatterPlot
              domain={[-5, 5]}
              range={[-5, 5]}
              data={pairsFromIndex(0, simpleData)}
            />
            <List textColor="secondary" margin="-100">
              <Appear>
                <ListItem textSize={30}>We can define a function that tells us "how inaccurate" our line is</ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'Loss(w) = \\sum_{i=0}^n (y_i - (w_0x_{0i} + w_1x_{1i}))^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textColor="tertiary" textSize={30}>Loss is "penalized" quadratically the further an individual data point is from the line</ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgColor="primary">
            <Heading size={5} lineHeight={1} textColor="tertiary" caps>
              Linear regression
            </Heading>
            <CrosshairsScatterPlot
              domain={[-5, 5]}
              range={[-5, 5]}
              data={pairsFromIndex(0, simpleData)}
            >
              <VictoryLine
                data={[
                  { x: -5, y: 0 },
                  { x: 5, y: 0 }
                ]}
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc"}
                }}
              />
            </CrosshairsScatterPlot>
            <List textColor="secondary" margin="-100">
              <Appear>
                <ListItem textSize={30}>Lets try it with <MathJax.Node inline>{'w_0 = 0'}</MathJax.Node> and <MathJax.Node inline>{'w_1 = 0'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'Loss(w) = \\sum_{i=0}^n (y_i - (0x_{0i} + 0x_{1i}))^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'Loss(w) = 0^2 + 2^2 + 2^2 + 3^2 + 4^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'Loss(w) = 33'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textColor="tertiary" textSize={30}>That's a lot of loss...</ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgColor="secondary">
            <Heading size={1} fit lineHeight={1} textColor="primary">
              Improving the situation
            </Heading>
            <List textColor="primary">
              <Appear>
                <ListItem>We need to adjust <MathJax.Node inline>{'w_0 = 0'}</MathJax.Node> and <MathJax.Node inline>{'w_1 = 0'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem>But we need to know what direction to go in</ListItem>
              </Appear>
              <Appear>
                <ListItem>Calculus to the rescue!</ListItem>
              </Appear>
              <Appear>
                <ListItem>The derivative of <MathJax.Node inline>{'Loss(w) = \\sum_{i=0}^n (y_i - (w_0x_{0i} + w_1x_{1i}))^2'}</MathJax.Node> will tell you which direction go to in</ListItem>
              </Appear>
              <Appear>
                <ListItem textColor="tertiary">Looks messy, how do you take the derivative?</ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgImage={images.volcano.replace("/", "")} bgDarken={0.7}>
            <Heading size={1} fit lineHeight={1} textColor="primary">
              The dreaded "math slide"
            </Heading>
            <List textColor="primary">
              <Appear>
                <ListItem>We are trying to take the derivative of <MathJax.Node inline>{'Loss(w) = \\sum_{i=0}^n (y_i - (0x_{0i} + 0x_{1i}))^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem><MathJax.Node inline>{'\\frac{d}{dx} {x}^a = ax^{a - 1}'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem><MathJax.Node inline>{'\\frac{d}{dx} 1 = 0'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem>Sum:<MathJax.Node inline>{'\\frac{d}{dx} (a + b + c) = \\frac{d}{dx}a + \\frac{d}{dx}b + \\frac{d}{dx}c'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem><MathJax.Node inline>{'\\frac{d}{dx} \\sum_{i=0}^n x_i = \\sum_{i=0}^n \\frac{d}{dx} x_i'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem>Chain:<MathJax.Node inline>{'\\frac{d}{dx} (f(x))^a = (a(f(x))^{a - 1})(\\frac{d}{dx} f(x))'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem>Partial:<MathJax.Node inline>{'\\frac{\\partial}{\\partial x} ax^q + by^r + cz^s = qax^{q - 1}'}</MathJax.Node>(treat <MathJax.Node inline>{'y'}</MathJax.Node> and <MathJax.Node inline>{'z'}</MathJax.Node> as constants)</ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgImage={images.volcano.replace("/", "")} bgDarken={0.7}>
            <Heading size={1} fit lineHeight={1} textColor="primary">
              The other dreaded "math slide"
            </Heading>
            <List textColor="primary">
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'\\frac{d}{dw_i} Loss(w) = \\frac{d}{dw_i} \\sum_{i=0}^n (y_i - (w_0x_{0i} + w_1x_{1i}))^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'\\frac{\\partial}{\\partial w_0} \\sum_{i=0}^n (y_i - (w_0x_{0i} + w_1x_{1i}))^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Sum: <MathJax.Node inline>{'\\sum_{i=0}^n \\frac{\\partial}{\\partial w_0} (y_i - (w_0x_{0i} + w_1x_{1i}))^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Chain: <MathJax.Node inline>{'\\sum_{i=0}^n 2 (y_i - (w_0x_{0i} + w_1x_{1i})) \\times \\frac{\\partial}{\\partial w_0} (y_i - (w_0x_{0i} + w_1x_{1i}))'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Partial: <MathJax.Node inline>{'\\sum_{i=0}^n 2 (y_i - (w_0x_{0i} + w_1x_{1i})) \\times (0 - (x_{0i} + 0))'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Rearrange: <MathJax.Node inline>{'-2 \\sum_{i=0}^n (y_i - (w_0x_{0i} + w_1x_{1i})) x_0'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Same thing for <MathJax.Node inline>{'w_1'}</MathJax.Node>: <MathJax.Node inline>{'\\sum_{i=0}^n -2 (y_i - (w_0x_{0i} + w_1x_{1i})) x_1'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textColor="tertiary">How do we use this to update our weights?</ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgColor="secondary">
            <Heading size={1} fit lineHeight={1} textColor="tertiary" caps>
              Gradient Descent
            </Heading>
            <List textColor="primary">
              <Appear>
                <ListItem textSize={30}>-2 is a constant, so we can just replace with some learning rate <MathJax.Node inline>{'\\alpha'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'\\partial w_j = \\alpha \\sum_{i=0}^n (y_i - (w_0x_{0i} + w_1x_{1i})) x_{ij}'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Lets plug some values into the gradients for <MathJax.Node inline>{'w_0'}</MathJax.Node>, <MathJax.Node inline>{'w_1'}</MathJax.Node>, <MathJax.Node inline>{'y_i'}</MathJax.Node>, <MathJax.Node inline>{'x_{0i}'}</MathJax.Node> and <MathJax.Node inline>{'x_{1i}'}</MathJax.Node> to compute <MathJax.Node inline>{'\\partial w_j'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={11}><MathJax.Node inline>{'\\partial w_0 = \\alpha ((1 - ((0)(1) + (0)(0)))(1)) + ((2 - ((0)(1) + (0)(1)))(1)) + ((3 - ((0)(1) + (0)(3)))(1)) + ((2 - ((0)(1) + (0)(4)))(1)) + ((0 - ((0)(1) + (0)(0)))(1))'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'\\alpha (1 + 2 + 3 + 2 + 0)'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'\\alpha 8'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Add <MathJax.Node inline>{'\\alpha 8'}</MathJax.Node> to <MathJax.Node inline>{'w_0'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={11}><MathJax.Node inline>{'\\partial w_1 = \\alpha ((1 - ((0)(1) + (0)(0)))(0)) + ((2 - ((0)(1) + (0)(1)))(1)) + ((3 - ((0)(1) + (0)(3)))(3)) + ((2 - ((0)(1) + (0)(4)))(2)) + ((0 - ((0)(1) + (0)(0)))(0))'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'\\alpha ((1 \\times 0) + (2 \\times 1) + (3 \\times 3) + (2 \\times 4) + (0 \\times 0))'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'\\alpha 19'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Add <MathJax.Node inline>{'\\alpha 19'}</MathJax.Node> to <MathJax.Node inline>{'w_1'}</MathJax.Node></ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgColor="secondary">
            <Heading size={1} fit lineHeight={1} textColor="tertiary" caps>
              Learning Rate
            </Heading>
            <List textColor="primary">
              <Appear>
                <ListItem textSize={30}>We probably do not want <MathJax.Node inline>{'\\alpha'}</MathJax.Node> to be 1, since this will result in another wildly inaccurate guess</ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Usually it is something like 0.001 </ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>You probably also want to normalize all your training data too, just divide each <MathJax.Node inline>{'x_{i}'}</MathJax.Node> by <MathJax.Node inline>{'max(x_{ij})'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'w_0 = w_0 + 0.008'}</MathJax.Node> and <MathJax.Node inline>{'w_1 = w_1 + 0.019'}</MathJax.Node></ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgColor="primary">
            <Heading size={5} lineHeight={1} textColor="tertiary" caps>
              Linear regression
            </Heading>
            <CrosshairsScatterPlot
              domain={[-5, 5]}
              range={[-5, 5]}
              data={pairsFromIndex(0, simpleData)}
            >
              <VictoryLine
                data={[
                  { x: -5, y: 0.008 + 0.019 * -5 },
                  { x: 5, y: 0.008 + 0.019 * 5 }
                ]}
              />
            </CrosshairsScatterPlot>
            <List textColor="secondary" margin="-100">
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'w_0 = 0.008'}</MathJax.Node> and <MathJax.Node inline>{'w_1 = 0.019'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'Loss(w) = \\sum_{i=0}^n (y_i - (0.008x_{0i} + 0.019x_{1i}))^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={10}><MathJax.Node inline>{'Loss(w) = (1 - ((0.008)(1) + (0.019)(0)))^2 + (2 - ((0.008)(1) + (0.019)(1)))^2 + (3 - ((0.008)(1) + (0.019)(3)))^2 + (2 - ((0.008)(1) + (0.019)(4)))^2 + (0 - ((0.008)(1) + (0.019)(0)))^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'Loss(w) = 18.71'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textColor="tertiary" textSize={30}>We did a little better this time!</ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgColor="secondary">
            <Heading size={1} fit lineHeight={1} textColor="tertiary" caps>
              Multivariate Linear Regression
            </Heading>
            <List textColor="primary">
              <Appear>
                <ListItem textSize={30}>How can we generalise to <MathJax.Node inline>{'n'}</MathJax.Node> dimensions?</ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>What does gradient descent look like <MathJax.Node inline>{'n'}</MathJax.Node> dimensions?</ListItem>
              </Appear>
            </List>
            <Appear>
              <Table textColor="primary" margin={"0 auto"} width={"50%"}>
                <TableRow>
                  <TableHeaderItem>
                    sqft <MathJax.Node inline>{`a`}</MathJax.Node>
                  </TableHeaderItem>
                  <TableHeaderItem>
                    bed <MathJax.Node inline>{`b`}</MathJax.Node>
                  </TableHeaderItem>
                  <TableHeaderItem>
                    bath <MathJax.Node inline>{`c`}</MathJax.Node>
                  </TableHeaderItem>
                  <TableHeaderItem>
                    view <MathJax.Node inline>{`d`}</MathJax.Node>
                  </TableHeaderItem>
                  <TableHeaderItem>
                    $ <MathJax.Node inline>{`s`}</MathJax.Node>
                  </TableHeaderItem>
                </TableRow>
                {housingData.map((data, i) => (
                  <TableRow key={i}>
                    {data.map(d => <TableItem key={d}>{d}</TableItem>)}
                  </TableRow>
                ))}
              </Table>
            </Appear>
          </Slide>
          <Slide bgColor="primary">
            <Layout>
              <Fill>
                <Heading size={6}>Price vs Sqft</Heading>
                <VictoryChart>
                  <VictoryScatter
                    size={7}
                    data={pairsFromIndex(0, housingData)}
                  />
                </VictoryChart>
              </Fill>
              <Fill>
                <Heading size={6}>Price vs Bedrooms</Heading>
                <VictoryChart>
                  <VictoryScatter
                    size={7}
                    data={pairsFromIndex(1, housingData)}
                  />
                </VictoryChart>
              </Fill>
            </Layout>
            <Layout>
              <Fill>
                <Heading size={6}>Price vs Bathrooms</Heading>
                <VictoryChart>
                  <VictoryScatter
                    size={7}
                    data={pairsFromIndex(2, housingData)}
                  />
                </VictoryChart>
              </Fill>
              <Fill>
                <Heading size={6}>Price vs Viewings</Heading>
                <VictoryChart>
                  <VictoryScatter
                    size={7}
                    data={pairsFromIndex(3, housingData)}
                  />
                </VictoryChart>
              </Fill>
            </Layout>
          </Slide>
          <Slide bgColor="secondary" textColor="primary">
            <Heading size={1} fit lineHeight={1} textColor="tertiary" caps>
              Multivariate Linear Regression
            </Heading>
            <List textColor="primary">
              <Appear>
                <ListItem textSize={30}>
                  We have <MathJax.Node inline>{`y_i = w_0x_0 + w_1a_i + w_2b_i + w_3c_i + w_4d_i`}</MathJax.Node>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>
                  Or really: <MathJax.Node inline>{`y_i = w_0x_{0i} + w_1x_{1i} + w_2x_{2i} + w_3x_{3i} + w_4x_{4i}`}</MathJax.Node>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>
                  Or *really*: <MathJax.Node inline>{`y_i = w_0x_{0i} + ... + w_nx_{ni}`}</MathJax.Node>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>
                  Or REALLY: <MathJax.Node inline>{`y_i = \\sum_{j=0}^n w_jx_{ji}`}</MathJax.Node>
                </ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgImage={images.volcano.replace("/", "")} bgDarken={0.7}>
            <Heading size={1} fit lineHeight={1} textColor="primary">
              One more MathSlide™
            </Heading>
            <List textColor="primary">
              <Appear>
                <ListItem textSize={30}>With vectors of size <MathJax.Node inline>{'v'}</MathJax.Node> we can find a the corresponding weight update equations</ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'\\frac{d}{dw_j} Loss(w) = \\frac{d}{dw_j} \\sum_{i=0}^n (y_i - (\\sum_{i=0}^v w_jx_{ij}))^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'\\frac{\\partial}{\\partial w_j} \\sum_{i=0}^n (y_i - (\\sum_{i=0}^v w_jx_{ij}))^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Sum: <MathJax.Node inline>{'\\sum_{i=0}^n \\frac{\\partial}{\\partial w_j} (y_i - (\\sum_{i=0}^v w_jx_{ij}))^2'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Chain: <MathJax.Node inline>{'\\sum_{i=0}^n 2 (y_i - (\\sum_{i=0}^v w_jx_{ij})) \\times \\frac{\\partial}{\\partial w_j} (y_i - (\\sum_{i=0}^v w_jx_{ij}))'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Partial: <MathJax.Node inline>{'\\sum_{i=0}^n 2 (y_i - (\\sum_{i=0}^v w_jx_{ij})) \\times (0 - (x_{ij} + 0))'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Rearrange: <MathJax.Node inline>{'-2 \\sum_{i=0}^n (y_i - (\\sum_{i=0}^v w_jx_{ij})) x_{ij}'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}>Learning Rate: <MathJax.Node inline>{'\\alpha \\sum_{i=0}^n (y_i - (\\sum_{i=0}^v w_jx_{ij})) x_{ij}'}</MathJax.Node></ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgColor="secondary" textColor="primary">
            <Heading size={1} fit lineHeight={1} textColor="tertiary" caps>
              Weight Updates
            </Heading>
            <List textColor="primary">
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'w_0 = w_0 + \\alpha \\sum_{i=0}^n (y_i - (\\sum_{i=0}^v w_jx_{ij})) x_{i0}'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'w_1 = w_1 + \\alpha \\sum_{i=0}^n (y_i - (\\sum_{i=0}^v w_jx_{ij})) x_{i1}'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'w_2 = w_2 + \\alpha \\sum_{i=0}^n (y_i - (\\sum_{i=0}^v w_jx_{ij})) x_{i2}'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'w_3 = w_3 + \\alpha \\sum_{i=0}^n (y_i - (\\sum_{i=0}^v w_jx_{ij})) x_{i3}'}</MathJax.Node></ListItem>
              </Appear>
              <Appear>
                <ListItem textSize={30}><MathJax.Node inline>{'w_4 = w_4 + \\alpha \\sum_{i=0}^n (y_i - (\\sum_{i=0}^v w_jx_{ij})) x_{i4}'}</MathJax.Node></ListItem>
              </Appear>
            </List>
          </Slide>
          <CodeSlide
            lang="rust"
            code={require("raw-loader!../assets/diy-gradient-descent.rs")}
            ranges={[]}
            ranges={[
              { loc: [112, 120] },
              { loc: [73, 85] },
              { loc: [86, 93] },
              { loc: [0, 14] },
              { loc: [15, 20] },
              { loc: [47, 60] },
              { loc: [61, 67] },
              { loc: [123, 135] },
              { loc: [136, 143] }
            ]}
          />
          <Slide
            bgColor={"solarized"} textColor="primary"
          >
            <Image src={images.demo.replace("/", "")} fit />
          </Slide>
        </Deck>
      </MathJax.Context>
    );
  }
}
