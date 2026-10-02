enum AppFlavor { dev, prod }

class AppConfig {
  final AppFlavor flavor;
  final String apiBaseUrl;

  const AppConfig({
    required this.flavor,
    required this.apiBaseUrl,
  });

  static late AppConfig current;

  static void initialize(AppFlavor flavor) {
    current = AppConfig(
      flavor: flavor,
      // For local Android emulator, 10.0.2.2 maps to host machine localhost:3000
      apiBaseUrl: flavor == AppFlavor.dev
          ? 'http://10.0.2.2:3000/api/v1'
          : 'https://paatbari.vercel.app/api/v1',
    );
  }
}

class ApiEndpoints {
  ApiEndpoints._();

  // Cart & Pricing (Server-Authoritative)
  static const String cartQuote = '/cart/quote';

  // Orders
  static const String orders = '/orders';
  static const String trackOrder = '/track';

  // B2B Corporate Quotes
  static const String b2bEstimate = '/b2b/estimate';
  static const String b2bQuote = '/b2b/quote';

  // Authentication
  static const String sendOtp = '/auth/otp/send';
  static const String verifyOtp = '/auth/otp/verify';
  static const String customerProfile = '/me';

  // SSLCommerz Payments
  static const String sslInit = '/payments/sslcommerz/init';
}
