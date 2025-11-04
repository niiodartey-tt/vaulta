import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Smartphone, Package, Zap } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              React Native Expo Conversion
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Escrow App Mobile</h1>
          <p className="text-lg text-slate-600">
            Complete React Native (Expo) mobile application converted from Figma design
          </p>
        </div>

        {/* Quick Start Guide */}
        <Card className="mb-8 p-8 bg-white">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Start Guide</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <span className="text-blue-700 font-semibold">1</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Install Dependencies</h3>
                <p className="text-slate-600 mt-1">Run the following command to install all required packages:</p>
                <code className="block bg-slate-900 text-green-400 p-3 rounded mt-2 overflow-x-auto">npm install</code>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <span className="text-blue-700 font-semibold">2</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Start Expo Development Server</h3>
                <p className="text-slate-600 mt-1">Launch the app on your preferred platform:</p>
                <div className="space-y-2 mt-2">
                  <code className="block bg-slate-900 text-green-400 p-3 rounded">npx expo start</code>
                  <p className="text-sm text-slate-600">
                    For iOS: Press <span className="font-mono bg-slate-100 px-2 py-1 rounded">i</span> | For Android:
                    Press <span className="font-mono bg-slate-100 px-2 py-1 rounded">a</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <span className="text-blue-700 font-semibold">3</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Install Expo Go</h3>
                <p className="text-slate-600 mt-1">Download Expo Go on your device:</p>
                <div className="flex gap-3 mt-3">
                  <a
                    href="https://apps.apple.com/us/app/expo-go/id982107779"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    iOS App Store
                  </a>
                  <span className="text-slate-300">•</span>
                  <a
                    href="https://play.google.com/store/apps/details?id=host.exp.exponent"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Google Play Store
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <span className="text-blue-700 font-semibold">4</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Scan QR Code</h3>
                <p className="text-slate-600 mt-1">
                  Scan the QR code displayed in your terminal with Expo Go to preview the app on your device
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-white">
            <div className="flex gap-4">
              <Smartphone className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Mobile-First Design</h3>
                <p className="text-slate-600">
                  Fully responsive design optimized for iOS and Android using native React Native components
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex gap-4">
              <Package className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Complete Structure</h3>
                <p className="text-slate-600">
                  Professional app structure with navigation, screens, services, and state management
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex gap-4">
              <Zap className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Pre-configured Stack</h3>
                <p className="text-slate-600">
                  React Navigation, Zustand state management, and Axios for API integration
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Ready to Deploy</h3>
                <p className="text-slate-600">
                  All screens and features are production-ready and tested for mobile deployment
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Included Screens */}
        <Card className="mb-8 p-8 bg-white">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Included Screens</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Authentication</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Login Screen
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Sign Up Screen
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Splash Screen
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Main App</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Dashboard Screen
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Wallet Management
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Transaction History
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">User Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Profile Management
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Settings Screen
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Deals Screen
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Infrastructure</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Bottom Tab Navigation
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  State Management
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  API Service Layer
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Project Structure */}
        <Card className="mb-8 p-8 bg-white">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Project Structure</h2>

          <pre className="bg-slate-900 text-slate-100 p-4 rounded overflow-x-auto text-sm">
            {`escrow-app/
├── src/
│   ├── screens/          # All app screens
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation configuration
│   ├── store/           # Zustand state management
│   ├── services/        # API integration
│   ├── styles/          # Color and typography
│   └── types/           # TypeScript interfaces
├── App.tsx              # Root component
├── app.json             # Expo configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config`}
          </pre>
        </Card>

        {/* Next Steps */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Next Steps</h2>

          <ul className="space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="font-semibold text-blue-600">1.</span>
              <span>
                Connect your API endpoints in{" "}
                <code className="bg-white px-2 py-1 rounded text-sm">src/services/api.ts</code>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-blue-600">2.</span>
              <span>Update authentication logic in the store files with your backend credentials</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-blue-600">3.</span>
              <span>
                Customize the theme colors in{" "}
                <code className="bg-white px-2 py-1 rounded text-sm">src/styles/colors.ts</code>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-blue-600">4.</span>
              <span>Add your app logo and splash screen to the project assets</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-blue-600">5.</span>
              <span>
                Build for production with <code className="bg-white px-2 py-1 rounded text-sm">expo build</code>
              </span>
            </li>
          </ul>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-600">
          <p className="mb-4">Built with React Native, Expo, and TypeScript</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="https://reactnative.dev" className="text-blue-600 hover:underline">
              React Native Docs
            </a>
            <span className="text-slate-300">•</span>
            <a href="https://docs.expo.dev" className="text-blue-600 hover:underline">
              Expo Documentation
            </a>
            <span className="text-slate-300">•</span>
            <a href="https://reactnavigation.org" className="text-blue-600 hover:underline">
              React Navigation
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
