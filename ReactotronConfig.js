import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: 'React Native Demo',
})
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: { veto: (stackFrame) => false },
    overlay: false,
  })
  .connect();
