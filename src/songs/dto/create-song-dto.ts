import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly artistes: number[]

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate: Date

    @IsNotEmpty()
    @IsMilitaryTime()
    readonly duration: Date

    @IsString()
    @IsOptional()
    readonly lyrics: string
}