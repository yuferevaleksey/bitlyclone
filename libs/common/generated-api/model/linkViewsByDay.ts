/**
 * Bit.ly Clone
 * Bit.ly clone API description
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface LinkViewsByDay { 
    /**
     * Link short code
     */
    linkCode: string;
    /**
     * Count view per day
     */
    count: number;
    /**
     * Date of link view
     */
    viewDate: Date;
}