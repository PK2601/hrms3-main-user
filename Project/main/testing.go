package main

import (
	"Project/main/database"
	"Project/main/functions"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	//Employee "example.com/aarang"

	//"Project/main/functions"
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

//	func SetupRouter() *gin.Engine {
//		router := gin.Default()
//
//		// Define all your routes here
//
//		return router
//	}
func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Enable CORS
	router.Use(cors.Default())

	return router
}
func main() {
	db, err := database.Connection()
	if err != nil {
		fmt.Println("Error connecting to database")
		panic(err.Error())
	}
	repo := functions.NewRepo(db)

	router := SetupRouter()

	router.GET("/employees", repo.GetEmployees)
	router.GET("/employees/:id", repo.GetEmployeeByID)
	router.POST("/employees", repo.CreateEmployee)
	router.PUT("/employees/:id", repo.UpdateEmployee)
	router.DELETE("/employees/:id", repo.DeleteEmployee)

	router.GET("/hrs", repo.GetHR)
	router.GET("/hrs/:hrId", repo.GetHRByID)
	router.POST("/hrs", repo.CreateHR)
	router.PUT("/hrs/:hrId", repo.UpdateHR)
	router.DELETE("/hrs/:hrId", repo.DeleteHR)

	router.GET("/departments", repo.GetDepartments)
	router.GET("/departments/:id", repo.GetDepartmentByID)
	router.POST("/departments", repo.CreateDepartment)
	router.PUT("/departments/:id", repo.UpdateDepartment)
	router.DELETE("/departments/:id", repo.DeleteDepartment)

	router.GET("/nationalholidays", repo.GetNationalHolidays)
	router.GET("/nationalholidays/:id", repo.GetNationalHolidayByID)
	router.POST("/nationalholidays", repo.CreateNationalHoliday)
	router.PUT("/nationalholidays/:id", repo.UpdateNationalHoliday)
	router.DELETE("/nationalholidays/:id", repo.DeleteNationalHoliday)

	router.GET("/leavetypes", repo.GetLeaveTypes)
	router.GET("/leavetypes/:id", repo.GetLeaveTypeByID)
	router.POST("/leavetypes", repo.CreateLeaveType)
	router.PUT("/leavetypes/:id", repo.UpdateLeaveType)
	router.DELETE("/leavetypes/:id", repo.DeleteLeaveType)

	router.GET("/leaves", repo.GetLeaves)
	router.GET("/leaves/:empId", repo.GetLeaveByEmpID)
	router.POST("/leaves", repo.CreateLeave)
	router.GET("/leaves/status", repo.GetLeaveByStatus)

	router.PUT("/leaves/:leaveId/approve", func(c *gin.Context) {
		repo.HandleApproveLeaveByLeaveID(c)
	})

	router.PUT("/leaves/:leaveId/reject", func(c *gin.Context) {
		repo.HandleRejectLeaveByLeaveID(c)
	})

	router.GET("/leavetypes/count", repo.CountLeaveTypes)
	router.GET("/employees/count", repo.CountEmployees)
	router.GET("/departments/count", repo.CountDepartments)
	router.GET("/leaves/approved/count", repo.CountApprovedLeaves) // Add count approved leaves route
	router.GET("/leaves/declined/count", repo.CountDeclinedLeaves) // Add count declined leaves route
	router.GET("/leaves/pending/count", repo.CountPendingLeaveApplications)

	router.GET("/employees/:id/password", repo.GetEmployeePassword)

	router.PUT("/employees/:id/password", repo.UpdateEmployeePassword)

	router.Run(":9036")
}
