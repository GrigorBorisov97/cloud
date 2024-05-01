<?php

namespace Tests\Unit;

use App\Http\Controllers\FolderController;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Http\Request;

class FolderTest extends TestCase
{
    public function createApplication()
    {
        $app = require __DIR__.'/../../bootstrap/app.php';
        $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
        return $app;
    }

    public function testGetPath()
    {
        $controller = new FolderController();
        $expectedPath = storage_path('app/') . 'grigor' . '/';
        $this->assertEquals($expectedPath, $controller->getPath());
    }

    public function testGetFolders()
    {
        $request = new Request();

        $controller = new FolderController();
        $response = $controller->getFolders($request);
     
        if ($response->getStatusCode() == 404) {
            $this->assertEquals(404, $response->getStatusCode());
        }

        $this->assertNotNull($response);

        $jsonResponse = json_encode($response);
        
        $this->assertJson($jsonResponse);
    }
    
    public function testGetInfo()
    {
        $request = new Request(['path' => 'root']);
        $controller = new FolderController();
        $response = $controller->getInfo($request);
    
        if ($response->getStatusCode() == 404) {
            $this->assertEquals(404, $response->getStatusCode());
        } else {
            $this->assertJson($response->getContent());
        
            $decodedResponse = json_decode($response->getContent(), true);
        
            $this->assertArrayHasKey('files', $decodedResponse);
            $this->assertArrayHasKey('folder_size', $decodedResponse);
        }
    }

    public function testConvertPathToArray()
    {
        $controller = new FolderController();

        $example_path_array = ["root", "root/pics", "root/pics/summer", "root/pics/testing", "root/test2"];
        $response = $controller->convertPathToArray($example_path_array);

        $expected_response = [["root",["pics","summer","testing"],"test2"]];

        $this->assertEquals($response, $expected_response);
    }
}
