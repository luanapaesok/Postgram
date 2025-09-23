import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsViewerComponent } from './posts-viewer.component';

describe('PostsViewerComponent', () => {
  let component: PostsViewerComponent;
  let fixture: ComponentFixture<PostsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
