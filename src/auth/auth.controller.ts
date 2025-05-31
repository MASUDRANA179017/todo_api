import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({
    status: 201,
    description: "User registered successfully",
    type: RegisterDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 409, description: "Conflict" })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  @ApiOperation({ summary: "Login a user" })
  @ApiResponse({
    status: 200,
    description: "User logged in successfully",
    type: LoginDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh access token" })
  @ApiResponse({
    status: 200,
    description: "Access token refreshed successfully",
    type: RefreshTokenDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 500, description: "Internal Server Error" })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<any> {
    return this.authService.refresh(refreshTokenDto.refreshToken);
  }


  @Get("profile")
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user profile" })
  @ApiResponse({
    status: 200,
    description: "User profile retrieved successfully",
  })
  @ApiResponse({ status: 401, description: "Forbidden" })
  async getProfile() {
    return this.authService.getProfile();
  }


 
}


