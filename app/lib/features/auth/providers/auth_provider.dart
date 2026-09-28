import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../../../core/constants/api_endpoints.dart';
import '../../cart/providers/cart_provider.dart';

class AuthState {
  final bool isAuthenticated;
  final String? phone;
  final String? customerName;
  final bool isLoading;
  final String? error;

  const AuthState({
    this.isAuthenticated = false,
    this.phone,
    this.customerName,
    this.isLoading = false,
    this.error,
  });

  AuthState copyWith({
    bool? isAuthenticated,
    String? phone,
    String? customerName,
    bool? isLoading,
    String? error,
  }) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      phone: phone ?? this.phone,
      customerName: customerName ?? this.customerName,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  final Ref _ref;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  AuthNotifier(this._ref) : super(const AuthState()) {
    _checkInitialAuth();
  }

  Future<void> _checkInitialAuth() async {
    final token = await _storage.read(key: 'auth_token');
    final phone = await _storage.read(key: 'customer_phone');
    if (token != null && phone != null) {
      state = state.copyWith(isAuthenticated: true, phone: phone);
    }
  }

  Future<bool> sendOtp(String phone) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final client = _ref.read(apiClientProvider);
      final res = await client.dio.post(
        ApiEndpoints.sendOtp,
        data: {'phone': phone},
      );
      state = state.copyWith(isLoading: false);
      return res.statusCode == 200 && res.data['success'] == true;
    } catch (e) {
      state = state.copyWith(isLoading: false, error: 'OTP পাঠানো সম্ভব হয়নি');
      return false;
    }
  }

  Future<bool> verifyOtp(String phone, String code) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final client = _ref.read(apiClientProvider);
      final res = await client.dio.post(
        ApiEndpoints.verifyOtp,
        data: {'phone': phone, 'code': code},
      );
      if (res.statusCode == 200 && res.data['success'] == true) {
        final token = res.data['token'] ?? 'mock_token_$phone';
        await _storage.write(key: 'auth_token', value: token);
        await _storage.write(key: 'customer_phone', value: phone);
        state = state.copyWith(
          isAuthenticated: true,
          phone: phone,
          isLoading: false,
        );
        return true;
      }
      state = state.copyWith(isLoading: false, error: res.data['message'] ?? 'ভুল ওটিপি কোড');
      return false;
    } catch (e) {
      state = state.copyWith(isLoading: false, error: 'যাচাইকরণ ব্যর্থ হয়েছে');
      return false;
    }
  }

  Future<void> logout() async {
    await _storage.deleteAll();
    state = const AuthState();
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier(ref);
});
