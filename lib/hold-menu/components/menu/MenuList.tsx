import React from 'react';
import { StyleSheet } from 'react-native';

import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  calculateMenuHeight,
  menuAnimationAnchor,
} from '../../utils/calculations';
import { BlurView } from '@react-native-community/blur';

import MenuItems from './MenuItems';

import {
  SPRING_CONFIGURATION_MENU,
  HOLD_ITEM_TRANSFORM_DURATION,
  IS_IOS,
  CONTEXT_MENU_STATE,
} from '../../constants';

import styles from './styles';
import { useInternal } from '../../hooks';
import { leftOrRight } from './calculations';

const AnimatedView = Animated.createAnimatedComponent(BlurView);

const MenuListComponent = () => {
  const { state, theme, menuProps, items: itemList } = useInternal();

  const menuHeight = useDerivedValue(() => {
    const itemsWithSeparator = menuProps.value.items.filter(
      item => item.withSeparator
    );
    return calculateMenuHeight(
      menuProps.value.items.length,
      itemsWithSeparator.length
    );
  }, [menuProps]);

  const messageStyles = useAnimatedStyle(() => {
    const itemsWithSeparator = menuProps.value.items.filter(
      item => item.withSeparator
    );

    const translate = menuAnimationAnchor(
      menuProps.value.anchorPosition,
      menuProps.value.itemWidth,
      menuProps.value.items.length,
      itemsWithSeparator.length
    );

    const _leftPosition = leftOrRight(menuProps);

    const menuScaleAnimation = () =>
      state.value === CONTEXT_MENU_STATE.ACTIVE
        ? withSpring(1, SPRING_CONFIGURATION_MENU)
        : withTiming(0, {
            duration: HOLD_ITEM_TRANSFORM_DURATION,
          });

    const opacityAnimation = () =>
      withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      });

    return {
      left: _leftPosition,
      height: menuHeight.value,
      opacity: opacityAnimation(),
      transform: [
        { translateX: translate.beginningTransformations.translateX },
        { translateY: translate.beginningTransformations.translateY },
        {
          scale: menuScaleAnimation(),
        },
        { translateX: translate.endingTransformations.translateX },
        { translateY: translate.endingTransformations.translateY },
      ],
    };
  });

  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme.value === 'light'
          ? IS_IOS
            ? 'rgba(255, 255, 255, .75)'
            : 'rgba(255, 255, 255, .95)'
          : IS_IOS
          ? 'rgba(0,0,0,0.5)'
          : 'rgba(39, 39, 39, .8)',
    };
  }, [theme]);

  const animatedProps = useAnimatedProps(() => {
    return { tint: theme.value };
  }, [theme]);

  return (
    <AnimatedView
      intensity={100}
      animatedProps={animatedProps}
      style={[styles.menuContainer, messageStyles]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.menuInnerContainer,
          animatedInnerContainerStyle,
        ]}
      >
        <MenuItems items={itemList} />
      </Animated.View>
    </AnimatedView>
  );
};

const MenuList = React.memo(MenuListComponent);

export default MenuList;
