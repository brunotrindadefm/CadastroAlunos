using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStudentModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                  name: "Name",
                  table: "Students",
                  type: "varchar(30)", // Alterando para varchar(30)
                  maxLength: 30,
                  nullable: false,
                  oldClrType: typeof(string),
                  oldType: "varchar(60)",
                  oldMaxLength: 60
              );

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Students",
                type: "varchar(30)", // Alterando para varchar(30)
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(60)",
                oldMaxLength: 60
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
        name: "Name",
        table: "Students",
        type: "varchar(60)", // Revertendo para varchar(60)
        maxLength: 60,
        nullable: false,
        oldClrType: typeof(string),
        oldType: "varchar(30)",
        oldMaxLength: 30
    );

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Students",
                type: "varchar(60)", // Revertendo para varchar(60)
                maxLength: 60,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30
            );
        }
    }
}
