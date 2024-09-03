import {Theme} from '@/lib/theme';
import {useTheme} from '@shopify/restyle';
import {useMemo} from 'react';
import {Platform, StyleSheet} from 'react-native';

export function useMarkdownStyle() {
  const theme = useTheme<Theme>();
  const style = useMemo(
    () =>
      StyleSheet.create({
        body: {
          color: theme.colors.text,
          fontSize: 16,
        },
        // Headings
        heading1: {
          flexDirection: 'row',
          fontWeight: 'bold',
          fontSize: 32,
          paddingVertical: theme.spacing.m,
        },
        heading2: {
          flexDirection: 'row',
          fontWeight: 'bold',
          fontSize: 24,
          paddingVertical: theme.spacing.m,
        },
        heading3: {
          flexDirection: 'row',
          fontWeight: 'bold',
          fontSize: 18,
          paddingVertical: theme.spacing.m,
        },
        heading4: {
          flexDirection: 'row',
          fontSize: 16,
          paddingVertical: theme.spacing.m,
        },
        heading5: {
          flexDirection: 'row',
          fontSize: 13,
          paddingVertical: theme.spacing.m,
        },
        heading6: {
          flexDirection: 'row',
          fontSize: 11,
          paddingVertical: theme.spacing.m,
        },

        // Horizontal Rule
        hr: {
          backgroundColor: theme.colors.border,
          height: 1,
        },

        // Emphasis
        strong: {
          fontWeight: 'bold',
        },
        em: {
          fontStyle: 'italic',
        },
        s: {
          textDecorationLine: 'line-through',
        },

        // Blockquotes
        blockquote: {
          backgroundColor: theme.colors.sheetBackground,
          borderLeftWidth: 4,
          marginLeft: 5,
          paddingHorizontal: 5,
        },

        // Lists
        bullet_list: {},
        ordered_list: {},
        list_item: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
        // @pseudo class, does not have a unique render rule
        bullet_list_icon: {
          marginLeft: 10,
          marginRight: 10,
          paddingVertical: theme.spacing.s,
        },
        // @pseudo class, does not have a unique render rule
        bullet_list_content: {
          flex: 1,
          paddingVertical: theme.spacing.s,
        },
        // @pseudo class, does not have a unique render rule
        ordered_list_icon: {
          marginLeft: 10,
          marginRight: 10,
          paddingVertical: theme.spacing.s,
        },
        // @pseudo class, does not have a unique render rule
        ordered_list_content: {
          flex: 1,
          paddingVertical: theme.spacing.s,
        },

        // Code
        code_inline: {
          backgroundColor: theme.colors.sheetBackground,
          padding: 10,
          borderRadius: 10,
          ...Platform.select({
            ['ios']: {
              fontFamily: 'Courier',
            },
            ['android']: {
              fontFamily: 'monospace',
            },
          }),
        },
        code_block: {
          backgroundColor: theme.colors.sheetBackground,
          padding: 10,
          borderRadius: 10,
          ...Platform.select({
            ['ios']: {
              fontFamily: 'Courier',
            },
            ['android']: {
              fontFamily: 'monospace',
            },
          }),
        },
        fence: {
          backgroundColor: theme.colors.sheetBackground,
          padding: 10,
          borderRadius: 10,
          marginVertical: theme.spacing.l,
          ...Platform.select({
            ['ios']: {
              fontFamily: 'Courier',
            },
            ['android']: {
              fontFamily: 'monospace',
            },
          }),
        },

        // Tables
        table: {
          borderWidth: 1,
          borderColor: '#000000',
          borderRadius: 3,
        },
        thead: {},
        tbody: {},
        th: {
          flex: 1,
          padding: 5,
        },
        tr: {
          borderBottomWidth: 1,
          borderColor: '#000000',
          flexDirection: 'row',
        },
        td: {
          flex: 1,
          padding: 5,
        },

        // Links
        link: {
          textDecorationLine: 'underline',
        },
        blocklink: {
          flex: 1,
          borderColor: '#000000',
          borderBottomWidth: 1,
        },

        // Images
        image: {
          flex: 1,
        },

        // Text Output
        text: {},
        textgroup: {},
        paragraph: {
          marginTop: 10,
          marginBottom: 10,
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
        },
        hardbreak: {
          width: '100%',
          height: 1,
        },
        softbreak: {},
      }),
    [theme],
  );

  return style;
}
