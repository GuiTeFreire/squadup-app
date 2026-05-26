const React = require("react");
const { View } = require("react-native");

const createMockIcon = (displayName) => {
  const Icon = ({ name, size, color, style, ...rest }) =>
    React.createElement(View, { testID: `icon-${name ?? displayName}`, style, ...rest });
  Icon.displayName = displayName;
  return Icon;
};

const MockIcon = createMockIcon("Icon");

module.exports = {
  MaterialCommunityIcons: createMockIcon("MaterialCommunityIcons"),
  Ionicons: createMockIcon("Ionicons"),
  FontAwesome: createMockIcon("FontAwesome"),
  FontAwesome5: createMockIcon("FontAwesome5"),
  AntDesign: createMockIcon("AntDesign"),
  Entypo: createMockIcon("Entypo"),
  EvilIcons: createMockIcon("EvilIcons"),
  Feather: createMockIcon("Feather"),
  MaterialIcons: createMockIcon("MaterialIcons"),
  Octicons: createMockIcon("Octicons"),
  SimpleLineIcons: createMockIcon("SimpleLineIcons"),
  Zocial: createMockIcon("Zocial"),
  default: MockIcon,
};
