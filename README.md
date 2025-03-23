# Streamelements React Widget Maker

This is a simple tool to create a custom widget for Streamelements using React.

## Requirements

- A Twitch account (https://www.twitch.tv/)
- A Streamelements account (https://streamelements.com/) to get a access token

## How to use

1. Clone this repository
2. Create a `.env` file in the root directory and add your access token and channel name (you can find your access token (JWT) [here](https://streamelements.com/dashboard/account/channels))
Example:
```
VITE_SE_TOKEN=your_access_token
VITE_TWITCH_CHANNEL=your_channel_name
```
3. Run `yarn install` to install the dependencies
4. Run `yarn dev` to start the development server
5. Open your browser and go to `http://localhost:5173/`
6. Edit the `src/app/index.tsx` file to create your custom widget
7. When you are done, run `yarn build` to create the production build
8. Copy the content of the `build` folder and paste it in the custom widget section of your Streamelements Overlay Editor
