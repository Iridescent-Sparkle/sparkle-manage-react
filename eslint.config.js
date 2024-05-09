import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,
  rules: {
    'ts/no-use-before-define': 'off',
    'react/prefer-shorthand-fragment': 'off',
    'react/no-useless-fragment': 'off',
  },
})
