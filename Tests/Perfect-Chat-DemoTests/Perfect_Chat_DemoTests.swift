import XCTest
@testable import Perfect_Chat_Demo

class Perfect_Chat_DemoTests: XCTestCase {
    func testExample() {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
        XCTAssertEqual(Perfect_Chat_Demo().text, "Hello, World!")
    }


    static var allTests : [(String, (Perfect_Chat_DemoTests) -> () throws -> Void)] {
        return [
            ("testExample", testExample),
        ]
    }
}
