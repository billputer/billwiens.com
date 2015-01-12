$(document).ready(function init() {
  var canvas = document.getElementById('magic-triangles'),
  stage = new createjs.Stage(canvas),
  initial_triangle_size = canvas.width * 0.8,
  initial_triangle_x = canvas.width / 2,
  initial_triangle_y = canvas.height / 2,
  vertical_ratio = 0.866,
  rotation_speed = 330;

  /**
   * Create triangle objects and then start animation
   */
  function setupAndAnimate() {
    // static triangle that never changes
    stage.addChild(createTriangle(initial_triangle_size, initial_triangle_x, initial_triangle_y));
    rootTriangle = createTriangle(initial_triangle_size, initial_triangle_x, initial_triangle_y);
    rootTriangle.iAmTheRoot = true;
    createSubTriangles(rootTriangle, initial_triangle_x, initial_triangle_y, initial_triangle_size / 3, 1);

    // start the party
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
    setTimeout(rotate, 1000, [rootTriangle]);
  }

  /**
   * Create a triangle using an EaselJS Shape
   */
  function createTriangle(size, x, y, upside_down) {
    var shape = new createjs.Shape(),
    g = shape.graphics,
    horizontal_offset = size / 2,
    vertical_offset = size * vertical_ratio / 3;

    shape.x = x;
    shape.y = y;
    shape.size = size;
    shape.upside_down = upside_down ? true : false;

    if (upside_down) {
      vertical_offset = vertical_offset * -1;
    }

    g.setStrokeStyle(1);
    g.beginStroke("black");
    
    g.moveTo(0, -2 * vertical_offset);
    g.lineTo(-1 * horizontal_offset, vertical_offset);
    g.lineTo(horizontal_offset, vertical_offset);
    g.lineTo(0, -2 * vertical_offset);

    return shape;
  }

  /**
   * Create sub-triangles of parent triangle up to a certain depth
   */
  function createSubTriangles(parent, x, y, size, depth){
    parent.children = [];
    var height = size * vertical_ratio;

    // top
    parent.children.push(createTriangle(size, x, y - (height * 4 / 3)));
    // bottom-left
    parent.children.push(createTriangle(size, x - size, y + (height * 2 / 3)));
    // bottom-right
    parent.children.push(createTriangle(size, x + size, y + (height * 2 / 3)));
    // upside-down triangles
    // top-left
    parent.children.push(createTriangle(size, x - size, y - (height * 2 / 3), true));
    // top-right
    parent.children.push(createTriangle(size, x + size, y - (height * 2 / 3), true));
    // bottom
    parent.children.push(createTriangle(size, x, y + (height * 4 / 3), true));

    // only the first child has a reference to it's parent
    // this prevents multiple children from calling reset on their parent
    parent.children[0].t_parent = parent;

    // create subtriangles up to a certain depth
    if (depth < 4) {
      $.each(parent.children,  function(i, t) {
        createSubTriangles(t, t.x, t.y, t.size / 3, depth + 1);
      });
    }
  }

  /**
   * Rotate an array of triangles, then rotate it's children
   */
  function rotate(triangles) {
    $.each(triangles, function(k, v) {
      stage.addChild(v);
      var direction = !v.upside_down ? 1 : -1;
      createjs.Tween.get(v)
        .to({rotation: direction * 60}, rotation_speed, createjs.Ease.quadInOut);
      if (v.hasOwnProperty("children")){
        createjs.Tween.get(v)
                      .wait(rotation_speed * 2)
                      .call(rotate, [v.children]);
      }
      else {
        createjs.Tween.get(v)
                      .wait(rotation_speed * 2)
                      .call(reset, [v]);
      }
    }); 
  }

  /**
   * Reverse triangle rotation, then remove from stage
   */
  function reset(triangle) {
    createjs.Tween.get(triangle)
        .to({rotation: 0}, rotation_speed, createjs.Ease.quadInOut)
        .call(remove_from_stage, [triangle]);

    if ( triangle.t_parent ) {
      console.log(triangle);
      createjs.Tween.get(triangle.t_parent)
                    .wait(rotation_speed * 2)
                    .call(reset, [triangle.t_parent]);
    }

    if ( triangle.iAmTheRoot ) {
      createjs.Tween.get(triangle.t_parent)
                    .wait(rotation_speed * 2)
                    .call(rotate, [[triangle]]);
    }
  }

  function remove_from_stage(child) {
    stage.removeChild(child);
  }

  setupAndAnimate();
})
