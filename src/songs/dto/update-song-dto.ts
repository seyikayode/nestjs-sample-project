import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongDTO {
    @IsOptional()
    @IsString()
    readonly title: string

    @IsOptional()
    @IsNumber({}, { each: true })
    @IsArray()
    readonly artistes: number[]

    @IsOptional()
    @IsDateString()
    readonly releasedDate: Date

    @IsOptional()
    @IsMilitaryTime()
    readonly duration: Date

    @IsOptional()
    @IsString()
    readonly lyrics: string
}